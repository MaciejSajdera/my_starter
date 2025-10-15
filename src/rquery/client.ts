import {
  QueryClient,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useQueryTanstack,
} from "@tanstack/react-query";
import type z from "zod";
import { api } from "@/api/connect";
import { host } from "@/api/connect/url";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0, // for the sake of explicitness, `0` is the default value
      retry: false,
    },
  },
});

// hooks

type UseQueryProps<T> = {
  schema: z.ZodSchema<T>;
  url: string;
  options?: UseQueryOptions<T>;
};

// disc union based on loading state to avoid unnecessary type guards
type QueryResult<T> =
  | (Omit<UseQueryResult<T>, "data" | "isLoading"> & {
      isLoading: true;
      data: undefined;
    })
  | {
      isLoading: false;
      data: T;
    };

export const useQuery = <T>({
  schema,
  url,
  options,
}: UseQueryProps<T>): QueryResult<T> => {
  const query = useQueryTanstack<T>({
    queryKey: [url],
    queryFn: async () => api.get(`${host}/${url}`),
    ...options,
  });

  if (query.isLoading) {
    return {
      ...query,
      isLoading: true,
      data: undefined,
    };
  }

  return {
    ...query,
    isLoading: false,
    data: schema.parse(query.data),
  };
};
