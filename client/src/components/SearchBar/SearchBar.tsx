import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import SearchResults from "@/components/SearchBar/SearchResults";
import RecentSearches from "@/components/SearchBar/RecentSearches";

export default function SearchBar() {
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const recentSearchesRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchResultsDisplayed, setIsSearchResultsDisplayed] =
    useState<boolean>(false);
  const [isRecentSearchesDisplayed, setIsRecentSearchesDisplayed] =
    useState<boolean>(false);

  useOutsideClick(recentSearchesRef, setIsRecentSearchesDisplayed);
  useOutsideClick(searchResultsRef, setIsSearchResultsDisplayed);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearchResultsDisplayed(true);
    } else {
      setIsSearchResultsDisplayed(false);
    }

    if (searchQuery.length > 0) {
      setIsRecentSearchesDisplayed(false);
    }
  }, [searchQuery]);

  const handleFocus = (event: any) => {
    if (event.target.value === "") {
      setIsRecentSearchesDisplayed(true);
    } else {
      setIsRecentSearchesDisplayed(false);
    }
  };

  return (
    <div className="searchBar">
      <div className="searchBar_field">
        <Image src={"/search.svg"} alt={"search"} width={"20"} height={"20"} />
        <input
          type="text"
          placeholder="Поиск"
          onFocus={handleFocus}
          className="searchBar_field_input"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(event.target.value)
          }
        ></input>
      </div>


      {isSearchResultsDisplayed ? (
        <SearchResults searchResultsRef={searchResultsRef} />
      ) : null}

      {isRecentSearchesDisplayed ? (
        <RecentSearches recentSearchesRef={recentSearchesRef} />
      ) : null}
    </div>
  );
}
