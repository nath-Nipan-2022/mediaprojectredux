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
      <div className="flex items-center justify-between pb-2 mb-2">
        <h2 className="text-2xl font-semibold">Users List</h2>

        <Button
          loading={isCreatingUser}
          primary
          onClick={handleAddUser}
          className="transition hover:bg-blue-600"
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
