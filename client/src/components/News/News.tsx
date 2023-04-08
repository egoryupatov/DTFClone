"use client";

import NewsItem from "@/components/News/NewsItem";
import Image from "next/image";
import { useState } from "react";
import { SERVER_URL } from "@/constants/const";
import { INews } from "@/types/news.type";
import axios from "axios";

interface NewsProps {
  news: INews[];
}

export default function News(props: NewsProps) {
  const [news, setNews] = useState(props.news);
  const [offset, setOffset] = useState(4);

  const handleGetMoreNews = () => {
    axios
      .get(`${SERVER_URL}/posts/news`, {
        params: {
          offset: offset,
        },
      })
      .then((response) => {
        setNews([...news, ...response.data]);
        setOffset((prevState) => prevState + 4);
      })
      .catch((error) => {
        console.error(error); //переписать на стейт
      });
  };

  return (
    <div className="news">
      {news.map((news: INews) => (
        <NewsItem news={news} key={news.id} />
      ))}
      <div className="news_more" onClick={handleGetMoreNews}>
        <div className="news_more_text">Показать еще</div>
        <div className="news_more_arrow">
          <Image
            src={"/more.svg"}
            alt={"show more"}
            width={"20"}
            height={"20"}
          />
        </div>
      </div>
    </div>
  );
}
