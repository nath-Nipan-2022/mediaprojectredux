import { GoSync, GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "../store/apis/photosApi";

function PhotosListItem({ photo }) {
  const [deletePhoto, results] = useDeletePhotoMutation();

  return (
    <figure
      onClick={() => deletePhoto(photo)}
      className="relative p-1 pb-4 bg-white rounded-md shadow-md"
    >
      <img
        className="h-24 rounded w-36 "
        src={photo.photo}
        alt="photo"
        width={100}
        height={100}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded opacity-0 cursor-pointer hover:opacity-80">
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
