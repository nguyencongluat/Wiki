export interface WikiPage {
  path: string;
  topic: string;
  name: string;
  component: any;
}

export interface WikiTopic {
  name: string;
  pages: WikiPage[];
  Layout?: any;
}

export function getWikiData() {
  const modules = import.meta.glob('/src/wiki/**/*.tsx', { eager: true });
  
  const topics: Record<string, WikiTopic> = {};

  for (const path in modules) {
    // path example: /src/wiki/BloxFruits/Guides/Farming.tsx
    // Remove prefix /src/wiki/
    const relativePath = path.replace('/src/wiki/', '');
    const parts = relativePath.split('/');
    
    // Topic is the first folder
    const topicName = parts[0];
    
    // Page Path is the rest
    // "BloxFruits/Guides/Farming.tsx" -> ["BloxFruits", "Guides", "Farming.tsx"]
    // Slice(1) -> ["Guides", "Farming.tsx"] -> join("/") -> "Guides/Farming.tsx"
    const pagePath = parts.slice(1).join('/').replace('.tsx', '');
    
    if (!topics[topicName]) {
      topics[topicName] = { name: topicName, pages: [] };
    }

    const component = (modules[path] as any).default;

    if (pagePath === 'Layout') {
        topics[topicName].Layout = component;
    } else {
        topics[topicName].pages.push({
            path,
            topic: topicName,
            name: pagePath, // This will be "Home", "TierList", or "Guides/Farming"
            component
        });
    }
  }

  return Object.values(topics).map(topic => ({
      ...topic,
      pages: topic.pages.sort((a, b) => a.name.localeCompare(b.name))
  }));
}
