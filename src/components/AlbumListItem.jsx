import { GoX } from "react-icons/go";
import { useDeleteAlbumMutation } from "../store/apis/albumsApi";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

function AlbumListItem({ album }) {
	const [deleteAlbum, { isLoading: isDeletingAlbum, error: deleteError }] =
		useDeleteAlbumMutation();

	const header = (
		<>
			<Button
				onClick={() => deleteAlbum(album)}
				rounded
				loading={isDeletingAlbum}
				className="text-gray-500 hover:bg-red-200 mr-4"
			>
				<GoX />
			</Button>
			<span>{album.title}</span>
			{deleteError && "Error in Deleting album"}
		</>
	);

	return (
		<ExpandablePanel className="bg-white rounded-sm" header={header}>
			<PhotosList album={album} />
		</ExpandablePanel>
	);
}
export default AlbumListItem;
