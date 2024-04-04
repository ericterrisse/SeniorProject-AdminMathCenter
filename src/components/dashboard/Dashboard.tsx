"use client";
import React, { useEffect, useState } from "react";
//import data from "@/lib/fake_data.json";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import BarChar from "./BarChar";
import Item from "./Item";
import ItemPicker from "./ItemPicker";
import { startOfWeek, endOfWeek, startofMonth } from 'date-fns';	

interface StudentData {
	fullname: string;
	className: string; 
	checkInTime: string;
}
const Dashboard = () => {
	const [students, setStudents] = useState<StudentData[]>([]);
	const [studentsWeek, setStudentsWeek] = useState<StudentData[]>([]);
	//const [weeklystudents, setWeeklystudents] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			try {
			const response = await fetch('http://localhost:3006/api/display');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();
			console.log(data);
			setStudents(data);
			} catch (error) {
				console.error('error:', error);
			}
		};
		const fetchDataWeek = async () => {
			try {
			const response = await fetch('http://localhost:3006/api/studentTracker');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();

			const start = new Date(startOfWeek(new Date, {weekStartsOn: 1})).getTime()
			const end = new Date(endOfWeek(new Date, {weekStartsOn: 1})).getTime()
			
			const studentsWeek = data.filter((s) => {
				new Date(s.checkInTime).getTime() > start;
				// new Date(s.checkInTime).getTime() < end;	

			} )
			console.log('students week: ', studentsWeek.length)
			setStudentsWeek(data);
			} catch (error) {
				console.error('error:', error);
			}
		};
	fetchData();
	fetchDataWeek();
	}, []);

	console.log(students)
	console.log(studentsWeek)



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
