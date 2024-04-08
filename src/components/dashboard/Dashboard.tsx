"use client";
import React, { useEffect, useState } from "react";
//import data from "@/lib/fake_data.json";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import BarChar from "./BarChar";
import Item from "./Item";
import ItemPicker from "./ItemPicker";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';	

interface StudentData {
	fullname: string;
	className: string; 
	checkInTime: string;
}

interface StudentTrack {
	studentId: string; 
	checkInTime: Date;
}
const Dashboard = () => {
	const [students, setStudents] = useState<StudentData[]>([]);
	const [studentsWeek, setStudentsWeek] = useState<StudentTrack[]>([]);
	const [studentsMonth, setStudentsMonth] = useState<StudentTrack[]>([]);
	//const [weeklystudents, setWeeklystudents] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			try {
			//gets fullname, className, checkInTime to fill table
			const response = await fetch('http://localhost:3006/api/display');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();
			//console.log(data);
			setStudents(data);
			} catch (error) {
				console.error('error:', error);
			}
		};
		const fetchDataMW = async () => {
			try {
			//gets distinct studentId and also the most recent time a student checked in
			const response = await fetch('http://localhost:3006/api/studentTracker');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();

			const startWeek = new Date(startOfWeek(new Date, {weekStartsOn: 1})).getTime()
			const endWeek = new Date(endOfWeek(new Date, {weekStartsOn: 1})).getTime()
			
			//finding checkInTimes that occurred 'this' week
			const studentsWeek = data.filter((s) => {
				const checkInTime = new Date(s.checkInTime).getTime();
    			return checkInTime > startWeek && checkInTime < endWeek;	
			})
			setStudentsWeek(studentsWeek.length);


			const startMonth = new Date(startOfMonth(new Date)).getTime()
			const endMonth = new Date(endOfMonth(new Date)).getTime()

			//finding checkInTimes that occurred 'this' month
			const studentsMonth = data.filter((s) =>{
				const checkInTime = new Date(s.checkInTime).getTime();
				return checkInTime >= startMonth && checkInTime <= endMonth;
			})
			setStudentsMonth(studentsMonth.length);

			} catch (error) {
				console.error('error:', error);
			}
		};
	fetchData();
	fetchDataMW();
	}, []);

	//console.log(students)
	//console.log(studentsWeek)



	return (
		<div className="p-10 flex flex-col gap-10">
			<div className="flex gap-10">
				<ItemPicker />
				<Item
					title="Students this week"
					text={"This week "+studentsWeek+" students have visited the center"}
				/>
				<Item
					title="Students this month"
					text={"This month "+studentsMonth+" students have visited the center"}
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
