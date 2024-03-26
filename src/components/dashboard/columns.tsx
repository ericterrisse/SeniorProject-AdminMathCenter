"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export type Student = {
//	id: string;
	fullname: string;
	StudentTracker: { className: string; checkInTime: string }[];
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
            const { StudentTracker } = row.original;
            if (StudentTracker && StudentTracker.length > 0) {
                return (
                    <div>
                        {StudentTracker.map((tracker, index) => (
                            <div key={index}>{tracker.className}</div>
                        ))}
                    </div>
                );
            }
            return <div>No classes found</div>;
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
		cell: ({ row }) => {
            const { StudentTracker } = row.original;
            if (StudentTracker && StudentTracker.length > 0) {
                return (
                    <div>
                        {StudentTracker.map((tracker, index) => (
                            <div key={index}>{dayjs(tracker.checkInTime).format("DD/MM/YYYY HH:mm")}</div>
                        ))}
                    </div>
                );
            }
            return <div>No check-in times found</div>;
        },
	},
];
