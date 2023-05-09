"use client";
import Image from "next/image";
import React from "react";
import { ISearchResult } from "@/types/searchResult.type";
import { useRouter } from "next/navigation";

interface SearchResultsProps {
  searchResultsRef: React.RefObject<any>;
  searchResults: ISearchResult[];
  setIsSearchResultsDisplayed: (isSearchResultsDisplayed: boolean) => void;
  setSearchQuery: (searchQuery: string) => void;
}

export default function SearchResults(props: SearchResultsProps) {
  const router = useRouter();

  const handleClick = (postId: number) => {
    router.push(`/post/${postId}`);
    props.setIsSearchResultsDisplayed(false);
    props.setSearchQuery("");
  };

  return (
    <div className="searchResults" ref={props.searchResultsRef}>
      {props.searchResults.map((result: ISearchResult) => (
        <div
          key={result.id}
          className="searchResults_item"
          onClick={() => handleClick(result.id)}
        >
          <Image src={"/pencil.svg"} alt={"news"} height={"20"} width={"20"} />
          {result.title}
        </div>
      ))}

      {props.searchResults.length > 0 ? (
        <div className="searchResults_item">
          <Image
            src={"/results.svg"}
            alt={"go to search results"}
            height={"20"}
            width={"20"}
          />
          Перейти к результатам
        </div>
      ) : (
        <div className="searchResults_nothing">Ничего не найдено</div>
      )}
    </div>
  );
}
