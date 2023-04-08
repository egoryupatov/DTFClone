"use client";
import Image from "next/image";

interface LikesProps {
  type: string;
  likes: number;
  contentId: number;
}

export default function Likes(props: LikesProps) {
  return (
    <div className="likes">
      <div className="likes_img">
        <Image
          src={"/like.svg"}
          alt={"like button"}
          width={"20"}
          height={"20"}
        />
      </div>
      <div className="likes_number">{props.likes}</div>
    </div>
  );
}
