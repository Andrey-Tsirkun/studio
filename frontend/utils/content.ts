import { PostContent } from '../types/post';

/**
 * Extracts and truncates text content from post blocks
 * @param content Array of post content blocks
 * @returns Truncated text content
 */
export const getPostContent = (content: PostContent): string => {
  return content
    .map(block => block.children.map(child => child.text).join(''))
    .join('\n')
    .substring(0, 150) + '...';
}; 