"use client";
import React, { useEffect, useState } from "react";
//import data from "@/lib/fake_data.json";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import BarChar from "./BarChar";
import Item from "./Item";
import ItemPicker from "./ItemPicker";

interface StudentData {
	fullname: string;
	StudentTracker: { className: string; checkInTime: string}[];
}
const Dashboard = () => {
	const [students, setStudents] = useState<StudentData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
			const response = await fetch('http://localhost:3007/api/display');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();
			setStudents(data);
			} catch (error) {
				console.error('error:', error);
			}
		};
	fetchData();
	}, []);

	return (
		<div className="p-10 flex flex-col gap-10">
			<div className="flex gap-10">
				<ItemPicker />
				<Item
					title="Students this week"
					text="This week 34 students have visited the center"
				/>
				<Item
					title="Students this month"
					text="This month 134 students have visited the center"
				/>
				<Item
					title="Most popular class"
					text="The most popular class this month is Calculus I"
				/>
			</div>
			<div className="flex gap-10">
				<div className="w-3/5">
					<DataTable columns={columns} data={students} />
				</div>
				<BarChar />
			</div>
		</div>
	);
};
export default Dashboard;
