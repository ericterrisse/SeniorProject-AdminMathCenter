"use client";

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
		labels: [],
		datasets: [],
	});

	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		setChartData({
			labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
			datasets: [
				{
					label: "Calculus I",
					data: [12, 7, 4, 9, 1, 23, 5],
					borderColor: "orange",
					backgroundColor: "orange",
				},
				{
					label: "Computer Science I",
					data: [10, 1, 12, 18, 2, 12, 2],
					borderColor: "gray",
					backgroundColor: "gray",
				},
				{
					label: "Statistics",
					data: [2, 3, 10, 12, 10, 12, 19],
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgb(53, 162, 235, 0.4",
				},
				{
					label: "Algebra",
					data: [5, 2, 7, 12, 2, 5, 1],
					borderColor: "green",
					backgroundColor: "green",
				},
			],
		});
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
