import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchUsers from "../store/thunks/fetchUsers";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

export default function UsersList() {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	if (isLoading) {
		return <Skeleton times={5} />;
	}

	if (error) {
		return <div>Error fetching data</div>;
	}

	return <div>{data.length}</div>;
}
