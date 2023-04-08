import Image from "next/image";
import { getShortLogin } from "@/utils/getShortLogin";
import { getShortTitle } from "@/utils/getShortTitle";
import { getShortCommentText } from "@/utils/getShortCommentText";
import { ILiveComment } from "@/types/liveComment.type";
import Link from "next/link";

interface LiveCommentProps {
  liveComment: ILiveComment;
}

export default function LiveComment(props: LiveCommentProps) {
  return (
    <div className="live_comment">
      <div className="live_comment_author">
        <div className="live_comment_avatar">
          <Image
            src={`${props.liveComment.user.avatar}`}
            className="avatar"
            alt="user avatar"
            width="36"
            height="36"
          />
        </div>
        <div className="live_comment_details">
          <div className="live_comment_details_top">
            <Link href={`/user/${props.liveComment.user.id}`}>
              {getShortLogin(props.liveComment.user.login)}
            </Link>
            <span>в записи</span>
          </div>
          <div className="live_comment_details_bottom">
            <Link href={`/post/${props.liveComment.post.id}`}>
              {getShortTitle(props.liveComment.post.title)}
            </Link>
          </div>
        </div>
      </div>
      <div className="live_comment_text">
        {getShortCommentText(props.liveComment.text)}
      </div>
    </div>
  );
}
