import React from "react";
import classNames from "classnames";

function Skeleton({ times, className }) {
	const classes = classNames(
		"mb-2.5 bg-gradient-to-r from-0% from-skeleton-400 via-20% via-skeleton-500 to-100% to-skeleton-400 bg-x-dbl-y-full animate-shimmer",
		className
	);

	const boxes = Array.from({ length: times }, (_, i) => (
		<div className={classes} key={i}></div>
	));
	return boxes;
}

export default Skeleton;
