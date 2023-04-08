import Image from "next/image";
import React from "react";
import { ISearchResult } from "@/types/searchResult.type";

export default function SearchResults(props: any) {
  const searchResults = [
    {
      title:
        "Простенько, но со вкусом: впечатления от Diablo IV после 12 часов в «бете»",
      id: 3,
    },
    {
      title:
        "Microsoft представила Microsoft 365 Copilot — «второго пилота» для работы",
      id: 2,
    },
    {
      title:
        "Microsoft представила Microsoft 365 Copilot — «второго пилота» для работы",
      id: 3,
    },
  ];

  return (
    <div className="searchResults" ref={props.searchResultsRef}>
      {searchResults.map((result: ISearchResult) => (
        <div key={result.id} className="searchResults_item">
          <Image src={"/pencil.svg"} alt={"news"} height={"20"} width={"20"} />
          {result.title}
        </div>
      ))}
      <div className="searchResults_item">
        <Image
          src={"/results.svg"}
          alt={"go to search results"}
          height={"20"}
          width={"20"}
        />
        Перейти к результатам
      </div>
    </div>
  );
}
