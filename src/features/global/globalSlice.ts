import { RootState } from "./../../app/store";
import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum Role {
  user = "user",
  admin = "admin",
  superadmin = "superadmin",
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: Array<string>;
  role: Role;
    createdAt: string;
    updatedAt: string;
};

type Stats = {
  createdAt: string;
  dailyData: Array<{
    date: string;
    totalSales: number;
    totalSoldUnits?: number;
    _id: string;
  }>;
  monthlyData: Array<{
    month: string;
    totalSales: number;
    totalSoldUnits?: number;
    _id: string;
  }>;
  productId: string;
  updatedAt: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  _id: string;
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  supply: number;
  stats: Stats;
};

export interface GlobalState {
  mode: PaletteMode;
  userId: string;
}

const initialState: GlobalState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = globalSlice.actions;
export const themeSelector = (state: RootState) => state.global.mode;

export default globalSlice.reducer;
