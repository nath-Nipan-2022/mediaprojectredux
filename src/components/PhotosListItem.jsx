import { GoSync, GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "../store/apis/photosApi";

function PhotosListItem({ photo }) {
	const [deletePhoto, results] = useDeletePhotoMutation();

	return (
		<figure
			onClick={() => deletePhoto(photo)}
			className="relative bg-white shadow-md rounded-md p-1 pb-4"
		>
			<img
				className="rounded h-24 w-36 "
				src={photo.photo}
				alt="photo"
				width={100}
				height={100}
			/>
			<div className="rounded cursor-pointer absolute inset-0 bg-gray-200 opacity-0 hover:opacity-80 flex justify-center items-center">
				{results.isLoading ? (
					<GoSync className="text-3xl animate-spin" />
				) : (
					<GoTrashcan className="text-3xl" />
				)}
			</div>
		</figure>
	);
}
export default PhotosListItem;
