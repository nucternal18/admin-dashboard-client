import { RootState } from './../../app/store';
import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
    mode: PaletteMode;
}

const initialState: GlobalState = {
    mode: "dark",
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload;
        }
    },
});

export const { setMode } = globalSlice.actions;
export const themeSelector = (state: RootState) => state.global.mode;

export default globalSlice.reducer;