import React from "react";
import { useThunk } from "../hooks/use-thunk";
import { removeUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoX } from "react-icons/go";

function UsersListItem({ user }) {
	const [doRemoveUser, isLoading, error] = useThunk(removeUser);

	const handleRemoveUser = (user) => {
		doRemoveUser(user);
	};

	const header = (
		<>
			<Button
				loading={isLoading}
				outline
				className="hover:bg-red-500 transition mr-4"
				onClick={() => handleRemoveUser(user)}
			>
				<GoX />
			</Button>
			{error && "Error in deleting user"}
			<span>{user.name}</span>
		</>
	);

	return <ExpandablePanel header={header}></ExpandablePanel>;
}

export default UsersListItem;
