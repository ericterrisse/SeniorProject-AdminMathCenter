"use client";

import React from "react";
import { DatePicker } from "./DatePicker";
import { Download, DownloadIcon } from "lucide-react";

const ItemPicker = () => {
	return (
		<div className="p-7 rounded-xl flex flex-col gap-3 border">
			<div className="flex justify-between">
				<h3 className="font-semibold text-2xl">Download visits</h3>

				<button onClick={() => alert("Downloading...")}>
					<DownloadIcon />
				</button>
			</div>
			<DatePicker />
		</div>
	);
};

export default ItemPicker;
