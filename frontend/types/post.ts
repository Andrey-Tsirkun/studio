export type PostContentBlock = {
  type: string;
  children: Array<{ text: string }>;
};

export type PostContent = Array<PostContentBlock>; 