export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
}

export enum AIStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K',
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string; placeAnswerSources?: { reviewSnippets?: any[] } };
}

export interface GeneratedContent {
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  sources?: GroundingChunk[];
}
