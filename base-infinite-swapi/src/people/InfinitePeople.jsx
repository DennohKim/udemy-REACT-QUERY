import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query

  //fetchNextPage is a function that runs when we want more data to be fetched
  //hasNextPage is a boolean that check if there is any more pages for data to collect
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching,  isError,error } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error! {error.toString()}</p>

  return (
    <> {isFetching && <div className="loading">Loading ...</div>}
     <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return (
            <Person
              key={person.key}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          );
        });
      })}
    </InfiniteScroll></>
   
  );
}
