import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./reducers/idSlice";
import userLogSlice from "./reducers/userLogSlice";

const store = configureStore({
	reducer: {
		id: idSlice,
		userLog: userLogSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
