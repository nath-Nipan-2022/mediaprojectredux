import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Button from "./Button";

function ExpandablePanel({ header, children, className }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={`mb-4 rounded ${className}`}>
			<div className="px-2 flex justify-between items-center border border-gray-300 rounded-sm shadow-sm">
				<h3 className="p-3 flex justify-between items-center">{header}</h3>

				<Button
					rounded
					className="text-gray-500 hover:bg-blue-200"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? <GoChevronDown /> : <GoChevronUp />}
				</Button>
			</div>
			{isExpanded && children}
		</div>
	);
}

export default ExpandablePanel;
