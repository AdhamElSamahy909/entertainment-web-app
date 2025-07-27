import { useEffect, useState } from "react";
import { useSearchQuery } from "../services/api/moviesTVSeriesApiSlice";
import { useLocation } from "react-router-dom";

export default function useSearch() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  let type = location.pathname.replace("/", "");
  type =
    type === ""
      ? ""
      : type === "tvseries"
        ? "TV Series"
        : type === "movies"
          ? "Movie"
          : "isBookmarked";

  console.log("Location Regarding Search: ", type);
  const { refetch, isLoading: isSearching } = useSearchQuery(
    { search, type },
    {
      skip: search.length === 0,
    }
  );

  useEffect(() => {
    const searchForResults = async () => {
      if (search) {
        try {
          const res = await refetch();
          console.log("Search Res: ", res);
          setSearchResult(res.data.data.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResult([]);
      }
    };

    searchForResults();
  }, [search, refetch]);

  return { search, setSearch, searchResult, isSearching };
}
