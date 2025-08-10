// Base Strapi response type
export interface StrapiResponse<T> {
  data: Array<T & {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Single item response
export interface StrapiSingleResponse<T> {
  data: T & {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta: {};
}

// Post type
export interface Post {
  title: string;
  content: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  slug: string;
} 