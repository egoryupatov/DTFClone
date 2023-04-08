import Form from "@/components/Comments/Form";
import { IComment } from "@/types/comment.type";
import Comment from "@/components/Comments/Comment";

interface CommentsProps {
  totalNumber: number;
  comments: IComment[];
}

export default function Comments(props: CommentsProps) {
  return (
    <div className="comments">
      <div className="comments_header">
        {props.totalNumber > 0
          ? `${props.totalNumber} комментария`
          : "Начать дискуссию"}
      </div>
      <Form />
      {props.comments.map((comment: IComment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
}
