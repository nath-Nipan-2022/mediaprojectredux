import { GoX } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { removeUser } from "../store";
import AlbumList from "./AlbumList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleRemoveUser = (user) => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button
        loading={isLoading}
        rounded
        className="mr-4 text-gray-500 hover:bg-red-200"
        onClick={() => handleRemoveUser(user)}
      >
        <GoX />
      </Button>
      {error && "Error in deleting user"}
      <span>{user.name}</span>
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
