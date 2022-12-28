import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { User, Product } from "../features/global/globalSlice";

// console.log(process.env.REACT_APP_API_URL);

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api/v1" }),
  tagTypes: ["User", "Product", "Customers", "Transactions", "Geography"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id: string) => `/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query<Array<Product>, void>({
      query: () => `/client/products`,
      providesTags: ["Product"],
    }),
    getCustomers: builder.query<Array<User>, void>({
      query: () => `/client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: builder.query<
      { transactions: Array<any>; total: number; },
      { page: Number; pageSize: number; sort: string; search: string }
    >({
      query: ({ page, pageSize, sort, search }) => ({
        url: `/client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: builder.query<Array<{id: string; value: number}>, void>({
      query: () => `/client/geography`,
      providesTags: ["Geography"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
} = api;
