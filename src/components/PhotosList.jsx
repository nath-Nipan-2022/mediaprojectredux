import {
	useFetchPhotosQuery,
	useAddPhotoMutation,
} from "../store/apis/photosApi";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

function PhotosList({ album }) {
	const { data, isFetching, error } = useFetchPhotosQuery(album);
	const [addPhoto, results] = useAddPhotoMutation();

	let content = "";
	if (isFetching) {
		content = <Skeleton times={3} className={"w-full h-16"} />;
	} else if (error) {
		content = "Error in fetching photos";
	} else {
		content = data.map((photo) => {
			return <PhotosListItem key={photo.id} photo={photo} />;
		});
	}

	return (
		<div className="p-6 border">
			<div className="flex justify-between items-center">
				<h4 className="font-medium">Photos In {album.title}</h4>
				<Button
					onClick={() => addPhoto(album)}
					loading={results.isLoading}
					className="bg-violet-500 text-white hover:bg-violet-600"
				>
					Add Photo
				</Button>
			</div>
			<div className="mt-4 flex gap-4 justify-center flex-wrap">{content}</div>
		</div>
	);
}
export default PhotosList;
