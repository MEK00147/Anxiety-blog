export type Category = 
  | 'ALL'
  | 'UNDERSTAND'
  | 'PRACTICAL TOOLS'
  | 'DAILY WELLBEING'
  | 'GETTING SUPPORT';

export type ResourceType = 'article' | 'tool' | 'exercise' | 'guide';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  description: string;
  readingTime: string; // e.g. "4 min" or "3 min"
  type: ResourceType;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  content?: ArticleContent;
}

export interface ArticleSection {
  heading: string;
  content: string[]; // Paragraphs
  bulletPoints?: string[];
  quote?: string;
  callout?: string;
}

export interface ArticleContent {
  author?: string;
  date?: string;
  readingTime: string;
  subtitle: string;
  sections: ArticleSection[];
  takeaways?: string[];
}

export interface WorryJournalEntry {
  id: string;
  timestamp: string;
  worry: string;
  controllable: 'yes' | 'no' | 'unsure';
  actionStep: string;
}
