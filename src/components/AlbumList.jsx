import React from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { GoX } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import AlbumListItem from "./AlbumListItem";

import {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
} from "../store/apis/albumsApi";

function AlbumList({ user }) {
	const { data, isLoading, error } = useFetchAlbumsQuery(user);
	const [addAlbum, { isLoading: isAddingAlbum, error: albumError }] =
		useAddAlbumMutation();

	let content = "";
	if (isLoading) {
		content = <Skeleton times={3} className={"h-10 w-full rounded"} />;
	} else if (error) {
		content = "Error loading album list";
	} else {
		content = data.map((album) => {
			return <AlbumListItem key={album.id} album={album} />;
		});
	}

	return (
		<div className="p-4 album border border-blue-200">
			<div className="flex justify-between mb-3">
				<h3 className="font-medium mb-4">Albums for {user.name}</h3>
				<Button
					loading={isAddingAlbum}
					onClick={() => addAlbum(user)}
					className="bg-indigo-500 text-white hover:bg-indigo-600"
				>
					Add Album
				</Button>
				{albumError && "Error adding album"}
			</div>

			{content}
		</div>
	);
}

export default AlbumList;
