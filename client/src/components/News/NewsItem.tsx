import Image from "next/image";
import { INews } from "@/types/news.type";
import Link from "next/link";

interface NewsItemProps {
  news: INews;
}

export default function NewsItem(props: NewsItemProps) {
  return (
    <div className="news_item">
      <Link href={`/post/${props.news.id}`} className={"news_item_title"}>
        {props.news.title}
      </Link>
      <Link href={`/post/${props.news.id}`} className={"news_item_comments"}>
        <span className={"news_item_comments_icon"}>
          <Image
            src={"/comment.svg"}
            width={"16"}
            height={"16"}
            alt={"comments"}
          />
        </span>
        <span className={"news_item_comments_number"}>
          {props.news.comments}
        </span>
      </Link>
    </div>
  );
}
