// route.ts

//import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

import { ClassName, Prisma, PrismaClient } from '@prisma/client'
//import cors from 'cors';
import express from 'express'

// Create Express app
//const app = express();
// const allowedOrigins = ['http://localhost:3001', 'localhost:3001'];

// Define CORS options with allowed origins
// const corsOptions = {
//     origin: (origin, callback) => {
//         // Check if the origin is included in the allowed origins
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true); // Allow the request
//         } else {
//             callback(new Error('Not allowed by CORS')); // Disallow the request
//         }
//     },
//     methods: ['GET', 'POST'], // Allow specific HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
// };

// // Initialize CORS middleware with options
// app.use(cors(corsOptions));
// // Define your API route
// app.post('/api/catch', async (req: Request, res: Response) => {
//     try {
//         const { fullname, studentID, classId } = req.body;
//         //splitting up full name to match database params
//         const [firstName, ...lastNameParts] = fullname.split(' ');
//         const lastName = lastNameParts.join(' ');
//         // Create a new student record in the database
//         const prisma = new PrismaClient();
//         const Student = await prisma.student.create({
//             data: {
//                 firstName,
//                 lastName,
//                 StudentTracker: {
//                     create: {
//                         studentID, // Include studentID in StudentTracker creation
//                         className: classId,
//                         checkInTime: new Date(), // Set checkInTime to current time
                        
//                     }
//                 }
//             },
//             include: {
//                 StudentTracker: true,
//             },
//         });

//         // Return the newly created student record
//         res.status(200).json(Student);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: "Could not create student record" });
//     }
// });

//export async function POST(req: Request) {
//    try{
//        const body = await req.json();
        //const { fullname, studentID, classId }: {fullname: string, studentID: number, classId: string} = body;
        //splitting up full name to match database params
        //const [firstName, ...lastNameParts] = fullname.split(' ');
        //const lastName = lastNameParts.join(' ');

        //const prisma = new PrismaClient();

        //const Student = await prisma.student.create({
        //    data: {
        //        firstName: body.fullname,
        //        lastName: body.fullname,
        //    },
        //});

        //const studentTracker = await prisma.studentTracker.create({
        //     data: {
        //         className: classId as ClassName,
        //         checkInTime: new Date(),
        //         //studentID,
        //     }
        // });
		//return NextResponse.json(Student, { status: 200 });
//    }catch(error){
//        return NextResponse.json(
			//{ message: "Could not check in student", receivedData: req.body,  },
			//{ status: 500 }
//		);
//    }
//}

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/api/catch`, async (req, res) => {
    const { fullname, studentID, classId } = req.body;
    //splitting up full name to match database params
    const [firstName, ...lastNameParts] = fullname.split(' ');
    const lastName = lastNameParts.join(' ');
    const studentIDP = parseInt(studentID);

    const Student = await prisma.student.create({
        data: {
        firstName,
        lastName,
        },
    });

    const studentTracker = await prisma.studentTracker.create({
        data: {
            className: classId as ClassName,
            checkInTime: new Date(),
            studentId: Student.id,
            //Student: {
            //  connect: { id: Student.id },  
            //},
            //
            //have to figure out how to make the below code work
            //studentId: parseInt(studentID),
        },
    });

  //res.json(studentTracker)
})

//running on different port bc it works for some reason
const server = app.listen(3002, () =>
  console.log(`
🚀 Server ready at: http://localhost:3002`),
)