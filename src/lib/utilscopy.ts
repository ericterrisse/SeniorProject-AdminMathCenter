// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { faker } from "@faker-js/faker";
// import * as fs from "fs";

// export function cn(...inputs: ClassValue[]) {
// 	return twMerge(clsx(inputs));
// }

// // Define a list of possible classes
// const classes: string[] = [
// 	"Math I",
// 	"Math II",
// 	"Biology",
// 	"Stats",
// 	"Computer Science I",
// 	"Computer Science II",
// ];

// // Function to generate fake data for a single entry
// export function generateFakeEntry(): any {
// 	return {
// 		id: faker.string.uuid(),
// 		name: faker.person.fullName(),
// 		class: faker.helpers.arrayElement(classes),
// 		checkInTime: faker.date.recent().toISOString(),
// 	};
// }

// // Generate a list of fake data entries
// const fakeData: any[] = Array.from({ length: 100 }, generateFakeEntry);

// // Write fake data to a JSON file
// fs.writeFileSync("src/lib/fake_data.json", JSON.stringify(fakeData, null, 2));

// console.log("Fake data generated and saved to fake_data.json.");
