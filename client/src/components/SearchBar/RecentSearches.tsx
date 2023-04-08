import Image from "next/image";
import React from "react";
import { ISearchResult } from "@/types/searchResult.type";

export default function RecentSearches(props: any) {
  const recentSearches = [
    {
      title: "Недавний запрос №1",
      id: 3,
    },
    {
      title: "Недавний запрос №2",
      id: 2,
    },
  ];
  return (
    <div className="searchResults" ref={props.recentSearchesRef}>
      <div className="recentSearches">Недавние запросы</div>
      {recentSearches.map((recent: ISearchResult) => (
        <div key={recent.id} className="searchResults_item">
          <Image src={"/pencil.svg"} alt={"news"} height={"20"} width={"20"} />
          {recent.title}
        </div>
      ))}
    </div>
  );
}
