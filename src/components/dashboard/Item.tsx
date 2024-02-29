import React from "react";

interface Props {
	title: string;
	text: string;
}

const Item = ({ title, text }: Props) => {
	return (
		<div className="p-7 rounded-xl flex flex-col gap-3 border">
			<h3 className="font-semibold text-2xl">{title}</h3>
			<p>{text}</p>
		</div>
	);
};

export default Item;
