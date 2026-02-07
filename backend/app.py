import os
import random
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'wiki.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    topic = db.relationship('Topic', backref='owner', uselist=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Topic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    categories = db.relationship('Category', backref='topic', lazy=True)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    pages = db.relationship('Page', backref='category', lazy=True)

class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True) 
    title = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    content = db.Column(db.Text, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# --- Routes ---
@app.route('/')
def hello():
    return {'message': 'Wiki Backend Running'}

# Auth
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and user.check_password(data.get('password')):
        return jsonify({
            'id': user.id, 
            'username': user.username, 
            'topic_id': user.topic.id if user.topic else None,
            'topic_title': user.topic.title if user.topic else None
        })
    return jsonify({'error': 'Invalid credentials'}), 401

# Topics (Wikis)
@app.route('/api/topics', methods=['GET'])
def get_topics():
    topics = Topic.query.all()
    return jsonify([{'id': t.id, 'title': t.title, 'owner': t.owner.username, 'description': t.description} for t in topics])

@app.route('/api/topics/<int:id>', methods=['GET'])
def get_topic_details(id):
    topic = Topic.query.get_or_404(id)
    categories = []
    for cat in topic.categories:
        pages = [{'id': p.id, 'title': p.title, 'slug': p.slug} for p in cat.pages]
        categories.append({'id': cat.id, 'name': cat.name, 'pages': pages})
    
    return jsonify({
        'id': topic.id,
        'title': topic.title,
        'description': topic.description,
        'categories': categories
    })

# Categories
@app.route('/api/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    cat = Category(topic_id=data['topic_id'], name=data['name'])
    db.session.add(cat)
    db.session.commit()
    return jsonify({'id': cat.id, 'name': cat.name})

# Pages
@app.route('/api/pages/<slug>', methods=['GET'])
def get_page(slug):
    page = Page.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        'id': page.id,
        'title': page.title,
        'content': page.content,
        'updated_at': page.updated_at.isoformat(),
        'topic_id': page.topic_id
    })

@app.route('/api/pages', methods=['POST'])
def create_page():
    data = request.get_json()
    slug = data['title'].lower().replace(' ', '-')
    # Ensure uniqueness
    if Page.query.filter_by(slug=slug).first():
        slug = f"{slug}-{int(datetime.utcnow().timestamp())}"
        
    page = Page(
        topic_id=data['topic_id'],
        category_id=data.get('category_id'),
        title=data['title'],
        slug=slug,
        content=data['content']
    )
    db.session.add(page)
    db.session.commit()
    return jsonify({'id': page.id, 'slug': slug})

# Init Scripts
def seed_data():
    if User.query.first():
        return
    
    users_data = [
        ('user1', 'Fruit Master', 'Blox Fruits Wiki'),
        ('user2', 'Sword Expert', 'Swords & Weapons'),
        ('user3', 'Traveler', 'Islands & Locations'),
        ('user4', 'Strategist', 'Guides & Strategy')
    ]
    
    for username, role, topic_title in users_data:
        u = User(username=username)
        u.set_password('password') # Simple password
        db.session.add(u)
        db.session.commit()
        
        t = Topic(user_id=u.id, title=topic_title, description=f"The ultimate source for {topic_title}.")
        db.session.add(t)
        db.session.commit()
        
        # Default Categories
        cats = ["General", "Advanced", "Strategy"]
        cat_objs = []
        for c_name in cats:
            c = Category(topic_id=t.id, name=c_name)
            db.session.add(c)
            cat_objs.append(c)
        db.session.commit()
        
        # Welcome Page
        p = Page(
            topic_id=t.id, 
            category_id=cat_objs[0].id, 
            title=f"Welcome to {topic_title}", 
            slug=f"welcome-{u.id}", 
            content=f"# Welcome to {topic_title}\n\nManaged by **{username}**.\n\nThis wiki covers everything about {topic_title}."
        )
        db.session.add(p)
    
    db.session.commit()

with app.app_context():
    db.create_all()
    seed_data()

if __name__ == '__main__':
    app.run(debug=True)
