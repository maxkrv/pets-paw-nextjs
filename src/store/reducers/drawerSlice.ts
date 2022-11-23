import { createSlice } from "@reduxjs/toolkit";

interface drawerSliceState {
	isDrawerOpen: boolean;
}

const initialState: drawerSliceState = {
	isDrawerOpen: false,
};

const drawerSlice = createSlice({
	name: "drawer",
	initialState,
	reducers: {
		openDrawer: (state) => {
			state.isDrawerOpen = true;
		},
		closeDrawer: (state) => {
			state.isDrawerOpen = false;
		},
	},
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
