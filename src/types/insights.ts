import type { ComponentType } from 'react';

export type PostAuthor = {
  name: string;
  role?: string;
  avatarInitials?: string; // used when no avatar image
};

export type PostCover = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — e.g. '2026-04-19'
  author: PostAuthor;
  tags: string[];
  readingTime?: string; // optional override ('7 min read')
  cover?: PostCover;
};

export type Post = {
  meta: PostMeta;
  Body: ComponentType;
};
