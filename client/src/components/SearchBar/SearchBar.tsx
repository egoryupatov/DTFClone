"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import SearchResults from "@/components/SearchBar/SearchResults";
import RecentSearches from "@/components/SearchBar/RecentSearches";
import axios from "axios";
import { SERVER_URL } from "@/constants/const";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const recentSearchesRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchResultsDisplayed, setIsSearchResultsDisplayed] =
    useState<boolean>(false);
  const [isRecentSearchesDisplayed, setIsRecentSearchesDisplayed] =
    useState<boolean>(false);

  useOutsideClick(recentSearchesRef, setIsRecentSearchesDisplayed);
  useOutsideClick(searchResultsRef, setIsSearchResultsDisplayed);

  useEffect(() => {
    const getSearchResults = async () => {
      const response = await axios.get(
        `${SERVER_URL}/posts/search/${searchQuery}`
      );

      setSearchResults(response.data);
      setIsSearchResultsDisplayed(true);
    };

    if (searchQuery) {
      getSearchResults();
    } else {
      setIsSearchResultsDisplayed(false);
    }
  }, [searchQuery]);

  return (
    <div className="searchBar">
      <div className="searchBar_field">
        <Image src={"/search.svg"} alt={"search"} width={"20"} height={"20"} />
        <input
          type="text"
          ref={inputRef}
          placeholder="Поиск"
          className="searchBar_field_input"
          value={searchQuery}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
          }}
        ></input>
      </div>

      {isSearchResultsDisplayed ? (
        <SearchResults
          searchResultsRef={searchResultsRef}
          searchResults={searchResults}
          setIsSearchResultsDisplayed={setIsSearchResultsDisplayed}
          setSearchQuery={setSearchQuery}
        />
      ) : null}

      {isRecentSearchesDisplayed && (
        <RecentSearches recentSearchesRef={recentSearchesRef} />
      )}
    </div>
  );
}
