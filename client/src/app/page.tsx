import PostFeed from "@/components/Post/PostFeed";
import News from "@/components/News/News";
import Sort from "@/components/Sort/Sort";
import { SERVER_URL } from "@/constants/const";
import { IPostFeed } from "@/types/postFeed.type";
import React from "react";

async function getNews() {
  const news = await fetch(`${SERVER_URL}/posts/news?offset=0`);

  if (!news.ok) {
    throw new Error("Failed to fetch data");
  }

  return news.json();
}

async function getPostsFeed() {
  const feed = await fetch(`${SERVER_URL}/posts/feed`);

  if (!feed.ok) {
    throw new Error("Failed to fetch data");
  }

  return feed.json();
}

export default async function Home() {
  // сделать параллельную загрузку по документации

  const news = await getNews();
  const postFeed = await getPostsFeed();

  return (
    <>
      <Sort />
      <div className="feed">
        <News news={news} />
        {postFeed.map((post: IPostFeed) => (
          <PostFeed post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
