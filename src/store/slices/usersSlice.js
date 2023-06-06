import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		data: [],
	},
	extraReducers(builder) {
		// builder.addCase(fetchUsers.pending, (state, action) => {
		// 	//update state however appropriately
		// 	// to show user that we are loading data from server
		// 	state.isLoading = true;
		// });
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		// builder.addCase(fetchUsers.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });
		// builder.addCase(addUser.pending, (state, action) => {
		// 	state.isLoading = true;
		// });
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.data.push(action.payload);
		});
		// builder.addCase(addUser.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });
		builder.addCase(removeUser.fulfilled, (state, action) => {
			state.data = state.data.filter((user) => user.id !== action.payload.id);
		});
	},
});

export const usersReducer = usersSlice.reducer;
