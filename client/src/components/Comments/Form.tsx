"use client";

import Image from "next/image";

export default function Form() {
  return (
    <div className="comment_form">
      <textarea
        className="comment_form_textarea"
        placeholder="Комментарий..."
      ></textarea>
      <div className="comment_form_actions">
        <button className="comment_form_actions_btn">
          <Image
            src={"/attachment.svg"}
            alt={"attach the image"}
            width={"20"}
            height={"20"}
          />
        </button>
      </div>
      {/*<div className="comment_form_buttons"></div>*/}
    </div>
  );
}
