import { useInfiniteQuery } from "@tanstack/react-query";

import type { CardsListType } from "../models/card";
import { APIClient } from "../services/api";

export const usePokemons = () => {
  const fetchCards = async ({ pageParam = 1 }): Promise<CardsListType> => {
    const response = await APIClient.fetchData(pageParam);
    return response;
  };

  return useInfiniteQuery({
    queryKey: ["cardsListData"],
    queryFn: fetchCards,
    staleTime: 0,
    enabled: true,
    getNextPageParam: (lastPage, _) => lastPage.page + 1
  });
};
