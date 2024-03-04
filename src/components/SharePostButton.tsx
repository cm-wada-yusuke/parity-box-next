'use client';

import { TwitterIcon, TwitterShareButton } from 'next-share';

type Props = {
  title: string;
  slug: string;
};

export function SharePostButton({ title, slug }: Props) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`;
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

  return (
    <div className="flex items-center justify-end">
      <TwitterShareButton
        url={url}
        title={title}
        via={twitterHandle}
        aria-label="Share on Twitter"
      >
        <TwitterIcon size={36} />
      </TwitterShareButton>
    </div>
  );
}
