import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILog } from "../../types/log";
import { uuid } from "uuidv4";

interface userLogState {
	logs: ILog[];
}

const initialState: userLogState = {
	logs: [],
};

const userLogSlice = createSlice({
	name: "userLog",
	initialState,
	reducers: {
		setLog: (state, action: PayloadAction<ILog>) => {
			const log: ILog = {
				id: uuid(),
				createdAt: action.payload.createdAt,
				imageId: action.payload.imageId,
				message: action.payload.message,
				value: action.payload.value,
			};

			if (state.logs.length >= 4) {
				state.logs.shift();
			}
			state.logs.push(log);
		},
	},
});

export const { setLog } = userLogSlice.actions;
export default userLogSlice.reducer;
