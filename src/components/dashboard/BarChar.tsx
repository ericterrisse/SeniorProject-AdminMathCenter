"use client";

import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';	
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
	}[];
}

interface Props {}

const BarChar = (props: Props) => {
	const [chartData, setChartData] = useState<ChartData>({
		labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
		datasets: [],
	});

	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {

		const fetchData = async () => {
			try {
			//gets fullname, className, checkInTime to fill table
			const response = await fetch('http://localhost:3006/api/chart');
			if (!response.ok) {
				throw new Error('failed to get data');
			}
			const data = await response.json();
			//console.log(data)

            //const currentDate = new Date();
            const startWeek = startOfWeek(new Date, {weekStartsOn: 1})
			const endWeek = endOfWeek(new Date, {weekStartsOn: 1})
            
            const countPerDay: { [key: string]: number[] } = {};
            data.forEach((s: { className: string; checkInTime: string }) => {
                const checkInTime = new Date(s.checkInTime);
                if(checkInTime >= startWeek && checkInTime <= endWeek){
                    const dayOfWeek = checkInTime.getDay();
                    const className = s.className;
                    
                    //if there isn't already an entry, create one and fill it with an array (size of a week) of 0's
					if(!countPerDay[className]){
                        countPerDay[className] = Array(7).fill(0);
                    }
                
                    //adding to count for that dayofweek
                    countPerDay[className][dayOfWeek-1]++;
                }
            });

			const classColors: { [key: string]: string } = {
				"Calc1":"orange",
				"Calc2":"red",
				"Algebra":"blue",
				"PreAlgebra":"gray",
			}

            // Prepare chart data
			setChartData({
                labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                datasets: Object.keys(countPerDay).map((className, index) => ({
                    label: className,
                    data: countPerDay[className],
                    borderColor: classColors[className],
                    backgroundColor: classColors[className],
                })),
            });

			} catch (error) {
				console.error('error:', error);
			}
		};

		setChartOptions({
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: "true",
					text: "Visits last 7 days",
				},
			},
			maintainAspectRatio: false,
			responsive: true,
		});
		fetchData();
	}, []);

	return (
		<>
			<div className="w-full relative lg:h-[70vh] h-[50vh] p-4 border rounded-lg bg-white">
				<Bar data={chartData} options={chartOptions} />
			</div>
		</>
	);
};

export default BarChar;
