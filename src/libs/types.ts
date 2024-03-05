import { Dayjs } from 'dayjs';

export type PostMeta = {
  slug: string;
  relativePath: string;
  publishedAt: Dayjs;
  title: string;
  published: boolean;
};

export type PostDetail = PostMeta & {
  html: string;
};
