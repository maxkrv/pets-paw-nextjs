import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./reducers/idSlice";
import userLogSlice from "./reducers/userLogSlice";
import isFavouriteSlice from "./reducers/isFavouriteSlice";
import drawerSlice from "./reducers/drawerSlice";

const store = configureStore({
	reducer: {
		id: idSlice,
		userLog: userLogSlice,
		isFavourite: isFavouriteSlice,
		drawer: drawerSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
