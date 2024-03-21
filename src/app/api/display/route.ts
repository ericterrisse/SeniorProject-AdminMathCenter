import { ClassName, Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get(`/api/display`, async (req, res) => {
    //add error handling
    const studentTrackers = await prisma.studentTracker.findMany({
            include: {
                student: {
                    select: {
                        firstName: true,
                        lastName: true,
                        fullName: {
                            _expression: '"firstName" || \' \' || "lastName"',
                        },
                    },
                },
                className: true,
            },
        });

        const studentInfo = studentTrackers.map(tracker => ({
            name: tracker.student.fullName,
            classId: tracker.className.id,
            checkInTime: tracker.checkInTime,
        }));

        res.json(studentInfo); 
})

//running on different port bc it works for some reason
const server = app.listen(3006, () =>
  console.log(`
🚀 Server ready at: http://localhost:3006`),
)