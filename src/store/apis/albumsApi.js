import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!!!
async function pauseFor(duration) {
	return new Promise((res) => setTimeout(res, duration));
}

const albumsApi = createApi({
	reducerPath: "albums",
	tagTypes: ["Albums"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
		//! REMOVE IN PRODUCTION !!!
		fetchFn: async (...args) => {
			await pauseFor(1000);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		fetchAlbums: builder.query({
			query: (user) => {
				return {
					url: "/albums",
					params: {
						userId: user.id,
					},
					method: "GET",
				};
			},
			// CREATING DYNAMIC TAGS
			providesTags: (result, error, user) => {
				return [{ type: "Album", id: user.id }];
			},
		}),

		// create a new album
		addAlbum: builder.mutation({
			invalidatesTags: (result, error, user) => {
				return [{ type: "Album", id: user.id }];
			},
			query: (user) => ({
				url: `/albums`,
				method: "POST",
				body: {
					userId: user.id,
					title: faker.commerce.productName(),
				},
			}),
		}),

		// delete the album
		deleteAlbum: builder.mutation({
			query: (album) => {
				return { url: `/albums/${album.id}`, method: "DELETE" };
			},
			invalidatesTags: (result, error, album) => {
				// console.log(album);
				return [{ type: "Album", id: album.userId }];
			},
		}),
	}),
});

export { albumsApi };
export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useDeleteAlbumMutation,
} = albumsApi;
