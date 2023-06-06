import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function UsersList() {
	const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers);
	const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

	const { data } = useSelector((state) => state.users);

	useEffect(() => {
		doFetchUsers();
	}, [doFetchUsers]);

	const handleAddUser = () => {
		doAddUser();
	};

	if (loadingUserError) {
		return <div>Error fetching data</div>;
	}

	const renderUsers = data.map((user) => {
		return <UsersListItem key={user.id} user={user} />;
	});

	return (
		<div className="m-4">
			<div className="pb-2 mb-2 flex items-center justify-between border-b border-b-gray-400">
				<h2>Users List</h2>

				<Button
					loadingWithChildren={isCreatingUser}
					outline
					onClick={handleAddUser}
					className="border border-gray-300 hover:bg-gray-200 transition"
				>
					Add User
				</Button>
				{creatingUserError && "Error creating user..."}
			</div>

			{isLoadingUsers ? (
				<Skeleton times={5} className={"h-10 w-full rounded"} />
			) : (
				renderUsers
			)}
		</div>
	);
}
