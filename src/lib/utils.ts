import { Student } from "@/components/dashboard/columns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const countStudentsByDate = (
	studentData: Student[]
): { date: string; count: number }[] => {
	const studentCountByDate: { [date: string]: number } = {};

	studentData.forEach((student) => {
		const checkInDate = new Date(student.checkInTime).toDateString();
		if (studentCountByDate[checkInDate]) {
			studentCountByDate[checkInDate]++;
		} else {
			studentCountByDate[checkInDate] = 1;
		}
	});

	return Object.entries(studentCountByDate).map(([date, count]) => ({
		date,
		count,
	}));
};

export default countStudentsByDate;
