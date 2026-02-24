import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Users } from "../types/dashboard.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<Users[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersQuery } = api;