"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "@/components/Login/Login";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsModalActive, setIsModalActive } from "@/store/blogSlice";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const isModalActive = useAppSelector(selectIsModalActive);

  const handleSignInClick = () => {
    dispatch(setIsModalActive(!isModalActive));
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(setIsModalActive(!isModalActive));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalActive]);

  return (
    <nav className="navbar">
      <div className="navbar_layout">
        <div className="navbar_layout_left">
          <Link href="/">
            <Image src="/logo.svg" width={56} height={20} alt="blog logo" />
          </Link>
        </div>
        <div className="navbar_layout_middle">
          <SearchBar />
        </div>
        <div className="navbar_layout_right">
          <Image src="/bell.svg" width={28} height={28} alt="notifications" />
          <button className="btn_login" onClick={handleSignInClick}>
            Войти
          </button>
        </div>
        {isModalActive ? <Login modalRef={modalRef} /> : null}
      </div>
    </nav>
  );
}
