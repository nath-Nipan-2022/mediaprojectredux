import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore(
	{
		reducer: {
			users: usersReducer,
			[albumsApi.reducerPath]: albumsApi.reducer,
			[photosApi.reducerPath]: photosApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(albumsApi.middleware)
				.concat(photosApi.middleware),
	}
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(photosApi.middleware),
);

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
