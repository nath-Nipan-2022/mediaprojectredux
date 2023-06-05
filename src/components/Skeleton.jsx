import React from "react";
import classNames from "classnames";

function Skeleton({ times }) {
	const classes = classNames("h-10", "w-46", "mb-2.5");

	const boxes = Array.from({ length: times }, (_, i) => (
		<div
			className={
				classes +
				"bg-gradient-to-r bg-[hsl(210,12%,97%)] to-0% bg-[hsl(228,16%,94%)] bg-[hsl(210,12%,97%) 20%] bg-[hsl(210,12%,97%) 100%] animate-shimmer"
			}
			key={i}
		></div>
	));
	return boxes;
}

export default Skeleton;
