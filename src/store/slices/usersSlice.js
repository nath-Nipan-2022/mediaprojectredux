import { createSlice } from "@reduxjs/toolkit";
import fetchUsers from "../thunks/fetchUsers";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		isLoading: false,
		data: [],
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(fetchUsers.pending, (state, action) => {
			//update state however appropriately
			// to show user that we are loading data from server
			state.isLoading = true;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

export const usersReducer = usersSlice.reducer;
