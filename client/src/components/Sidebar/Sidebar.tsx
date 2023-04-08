"use client";
import Category from "@/components/Sidebar/Category";
import { ICategory } from "@/types/category.type";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsModalActive, setIsModalActive } from "@/store/blogSlice";

export default function Sidebar() {
  const categories = [
    {
      id: 1,
      name: "Популярное",
      alias: "popular",
      image: "/fire.svg",
    },
    {
      id: 2,
      name: "Свежее",
      alias: "new",
      image: "/clock.svg",
    },
    {
      id: 3,
      name: "Моя лента",
      alias: "feed",
      image: "/feed.svg",
    },
  ];

  const dispatch = useAppDispatch();
  const isModalActive = useAppSelector(selectIsModalActive);

  const handleSignInClick = () => {
    dispatch(setIsModalActive(!isModalActive));
  };

  return (
    <div className="sidebar">
      {categories.map((category: ICategory) => (
        <Category
          key={category.id}
          id={category.id}
          name={category.name}
          alias={category.alias}
          image={category.image}
        />
      ))}
      <button className="btn_sidebar" onClick={handleSignInClick}>
        Новая запись
      </button>
    </div>
  );
}
