import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isFavouriteSliceState {
	isFavourite?: boolean;
	favouriteId?: number | null;
}

const initialState: isFavouriteSliceState = {
	isFavourite: false,
	favouriteId: null,
};

const isFavouriteSlice = createSlice({
	name: "isFavourite",
	initialState,
	reducers: {
		setIsFavourite: (
			state,
			action: PayloadAction<{
				value?: boolean;
				id?: number | null;
			}>
		) => {
			state.isFavourite = action.payload.value;
			state.favouriteId = action.payload.id;
		},
	},
});

export const { setIsFavourite } = isFavouriteSlice.actions;
export default isFavouriteSlice.reducer;
