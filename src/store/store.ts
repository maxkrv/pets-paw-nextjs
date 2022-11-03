import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./reducers/idSlice";

const store = configureStore({
	reducer: {
		id: idSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
