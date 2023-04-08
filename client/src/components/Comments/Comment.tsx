"use client";
import Image from "next/image";
import { IComment } from "@/types/comment.type";
import { transformDate } from "@/utils/transformDate";
import axios from "axios";
import { SERVER_URL } from "@/constants/const";
import { useState } from "react";
import Likes from "@/components/Likes/Likes";

interface CommentProps {
  comment: IComment;
}

export default function Comment(props: CommentProps) {
  const [answers, setAnswers] = useState([]);
  const [areNumberOfAnswersDisplayed, setAreNumberOfAnswersDisplayed] =
    useState(true);
  const [areAnswersExpanded, setAreAnswersExpanded] = useState(false);

  const handleGetAnswers = (commentId: number) => {
    axios
      .get(`${SERVER_URL}/comments/answers/${commentId}`)
      .then((response) => {
        setAnswers(response.data);
        setAreAnswersExpanded((prevState) => !prevState);
        setAreNumberOfAnswersDisplayed((prevState) => !prevState);
      })
      .catch((error) => {
        console.error(error); //переписать на стейт
      });
  };
  return (
    <>
      <div className="comment">
        <div className="comment_branches"></div>
        <div className="comment_content">
          <div className="comment_content_author">
            <div className="comment_content_author_avatar">
              <Image
                src={`${props.comment.user.avatar}`}
                alt={"user avatar"}
                width={"36"}
                height={"36"}
              />
            </div>
            <div className="comment_content_author_info">
              <div className="comment_content_author_info_username">
                {props.comment.user.login}
              </div>
              <div className="comment_content_author_info_date">
                {transformDate(props.comment.publishDate)}
              </div>
            </div>
          </div>
          <div className="comment_content_text">{props.comment.text}</div>
          <div className="comment_content_actions">
            <div className="comment_content_actions_left">
              <Likes
                type={"comment"}
                likes={props.comment.likes}
                contentId={props.comment.id}
              />
              <div className="comment_content_actions_left_answer">
                Ответить
              </div>
              <div className="comment_content_actions_left_dots">
                <Image
                  src={"/dots.svg"}
                  alt={"more actions"}
                  height={"16"}
                  width={"16"}
                />
              </div>
            </div>
            <div className="comment_content_actions_right">
              <Image
                src={"/download.svg"}
                alt={"download comments"}
                height={"20"}
                width={"20"}
              />
            </div>
          </div>
          {props.comment.numberOfAnswers > 0 && areNumberOfAnswersDisplayed ? (
            <div
              className="comment_content_expand"
              onClick={() => handleGetAnswers(props.comment.id)}
            >
              {props.comment.numberOfAnswers} ответов
            </div>
          ) : null}
        </div>
      </div>
      {areAnswersExpanded ? (
        <div className="comment_answers">
          {answers.map((answer: IComment) => (
            <Comment key={answer.id} comment={answer} />
          ))}
        </div>
      ) : null}
    </>
  );
}
