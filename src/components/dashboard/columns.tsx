"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export type Student = {
	fullname: string;
	className: string; 
	checkInTime: string;
};
export const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "fullname",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const { fullname } = row.original;
			return <div>{fullname}</div>

		},
	},
	{
		accessorKey: "className",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Class
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
             const { className } = row.original;
             return <div>{className}</div>;
        },
	},
	{
		accessorKey: "checkInTime",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date & Time
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		//sortType: "datetime",
		//sortDescFirst: false,

		cell: ({ row }) => {
            const { checkInTime } = row.original;
            return <div>{dayjs(checkInTime).format("DD/MM/YYYY HH:mm")}</div>
        },
	},
];
