"use client";

import LiveComment from "@/components/Live/LiveComment";
import { ILiveComment } from "@/types/liveComment.type";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface LiveProps {
  liveComments: ILiveComment[];
}

export default function Live(props: LiveProps) {
  const ioRef = useRef();

  const [liveComments, setLiveComments] = useState(props.liveComments);

  useEffect(() => {
    ioRef.current = io("http://localhost:3005");

    ioRef.current.on("newComment", (newComment: ILiveComment) => {
      setLiveComments((liveComments) => [
        newComment,
        ...liveComments.slice(0, liveComments.length - 1),
      ]);
    });

    return () => {
      ioRef.current.disconnect();
    };
  }, []);

  return (
    <div className="live">
      <div className="live_title">Сейчас обсуждают</div>
      <div className="live_comments">
        {liveComments.map((liveComment: ILiveComment) => (
          <LiveComment key={liveComment.id} liveComment={liveComment} />
        ))}
      </div>
    </div>
  );
}
