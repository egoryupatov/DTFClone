"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsModalActive } from "@/store/blogSlice";
import { setIsModalActive } from "@/store/blogSlice";

interface LoginProps {
  modalRef: any;
}

export default function Login(props: LoginProps) {
  const dispatch = useAppDispatch();
  const isModalActive = useAppSelector(selectIsModalActive);

  const handleCloseModel = () => {
    dispatch(setIsModalActive(!isModalActive));
  };

  return (
    <div className="overlay">
      <div className="login" ref={props.modalRef}>
        <button className="login_btn" onClick={handleCloseModel}>
          <Image
            src={"/cross.svg"}
            alt={"close the popup"}
            width={"24"}
            height={"24"}
          />
        </button>
        <div className="login_items">
          <div className="login_items_header">
            <div className="login_items_header_logo">
              <Image
                src={"/logo.svg"}
                alt={"logo"}
                height={"45"}
                width={"45"}
              />
            </div>
            <div className="login_items_header_title">Вход в аккаунт</div>
          </div>
          <div className="login_items_options">
            <button
              className="login_items_options_button"
              onClick={handleCloseModel}
            >
              <Image
                src={"/google.svg"}
                alt={"google"}
                width={"24"}
                height={"24"}
                className="login_items_options_image"
              />
              Продолжить с Google
            </button>
            <button className="login_items_options_button">
              <Image
                src={"/apple.svg"}
                alt={"apple"}
                width={"24"}
                height={"24"}
                className="login_items_options_image"
              />
              Продолжить с Apple
            </button>
            <button className="login_items_options_button">
              <Image
                src={"/email.svg"}
                alt={"email"}
                width={"24"}
                height={"24"}
                className="login_items_options_image"
              />
              Почта
            </button>
          </div>
          <div className="login_items_signUp">
            Нет аккаунта?{" "}
            <span className="login_items_signUp_link">Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  );
}
