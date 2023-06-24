import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApi = createApi({
	reducerPath: "photos",
	tagTypes: ["Photos"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
	}),

	endpoints: (builder) => ({
		fetchPhotos: builder.query({
			query: (album) => {
				return {
					url: "/photos/",
					params: {
						albumId: album.id,
					},
					method: "GET",
				};
			},
			providesTags: (results, error, album) => {
				const tags = results.map((photo) => {
					return { type: "photo", id: photo.id };
				});
				tags.push({ type: "UsersPhotos", id: album.id });
				console.log(tags);
				return tags;
			},
		}),

		addPhoto: builder.mutation({
			query: (album) => {
				return {
					url: "/photos",
					method: "POST",
					body: {
						albumId: album.id,
						photo: faker.image.urlLoremFlickr({ category: "abstract" }),
					},
				};
			},
			invalidatesTags: (results, error, album) => {
				return [{ type: "UsersPhotos", id: album.id }];
			},
		}),

		deletePhoto: builder.mutation({
			query: (photo) => {
				return {
					url: `/photos/${photo.id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (result, error, photo) => {
				return [{ type: "photo", id: photo.id }];
			},
		}),
	}),
});

export { photosApi };
export const {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useDeletePhotoMutation,
} = photosApi;
