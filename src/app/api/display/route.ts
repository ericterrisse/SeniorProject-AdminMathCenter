import { ClassName, Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const cors = require('cors');

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.get(`/api/display`, async (req, res) => {
try{
    const student = await prisma.student.findMany({
        select:{
            firstName:true,
            lastName:true,
            StudentTracker:{
                select:{
                    checkInTime: true,
                    className: true,
                }
            }
        }
    });

    const formattedStudents = student.map(student => ({
        fullname: `${student.firstName} ${student.lastName}`,
        StudentTracker: student.StudentTracker
    }));

    res.json(formattedStudents);
    } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
    }


});

const server = app.listen(3007, () =>
  console.log(`Server ready at: http://localhost:3007`),
)