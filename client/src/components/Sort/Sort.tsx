"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SortOption from "@/components/Sort/SortOption";
import { ISortOption } from "@/types/sortOption.type";
import { getCurrentDay } from "@/utils/getCurrentDay";

export default function Sort() {
  const [isSortingPopupDisplayed, setIsSortingPopupDisplayed] =
    useState<boolean>(false);

  const sortingItems = [
    {
      name: getCurrentDay(),
      alias: "/popular",
    },
    {
      name: "24 часа",
      alias: "/popular/day",
    },
    {
      name: "Неделя",
      alias: "/popular/week",
    },
    {
      name: "Месяц",
      alias: "/popular/month",
    },
    {
      name: "Год",
      alias: "/popular/year",
    },
    {
      name: "Все время",
      alias: "/popular/all",
    },
  ];

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsSortingPopupDisplayed((prevState) => !prevState);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSortingPopupDisplayed]);

  return (
    <div className="sort">
      <div
        className={"sort_current"}
        onClick={() => setIsSortingPopupDisplayed((prevState) => !prevState)}
      >
        <div className={"sort_current_date"}>
          {getCurrentDay()}
          <Image
            src={"/more.svg"}
            alt={"sort"}
            width={"16"}
            height={"16"}
            className="sort_more"
          />
        </div>
      </div>

      {isSortingPopupDisplayed ? (
        <div className="sort_options" ref={optionsRef}>
          {sortingItems.map((item: ISortOption) => (
            <SortOption item={item} key={item.name} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
