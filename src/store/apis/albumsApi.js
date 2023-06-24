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
				const tags = result.map((album) => {
					return { type: "Album", id: album.id };
				});
				tags.push({ type: "UsersAlbums", id: user.id });
				return tags;
			},
		}),

		// create a new album
		addAlbum: builder.mutation({
			query: (user) => ({
				url: `/albums`,
				method: "POST",
				body: {
					userId: user.id,
					title: faker.commerce.productName(),
				},
			}),
			invalidatesTags: (result, error, user) => {
				return [{ type: "UsersAlbums", id: user.id }];
			},
		}),

		// delete the album
		deleteAlbum: builder.mutation({
			query: (album) => {
				return { url: `/albums/${album.id}`, method: "DELETE" };
			},
			invalidatesTags: (result, error, album) => {
				return [{ type: "Album", id: album.id }];
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
