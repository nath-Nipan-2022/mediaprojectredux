import React from "react";
import { useThunk } from "../hooks/use-thunk";
import { removeUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoX } from "react-icons/go";
import AlbumList from "./AlbumList";

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
				className="text-gray-500 hover:bg-red-200 mr-4"
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
