import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function ExpandablePanel({ header, children, className }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={`mb-4 rounded bg-gray-200 ${className}`}>
			<div className="flex justify-between items-center">
				<h3 className="p-4 flex justify-between items-center">{header}</h3>

				<div
					onClick={() => setIsExpanded(!isExpanded)}
					className="p-4 cursor-pointer"
				>
					{isExpanded ? <GoChevronDown /> : <GoChevronUp />}
				</div>
			</div>
			{isExpanded && <div className={`pb-2 border`}>{children}</div>}
		</div>
	);
}

export default ExpandablePanel;
