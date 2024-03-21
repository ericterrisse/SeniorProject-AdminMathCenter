import { Student, ClassName, Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/api/catch`, async (req, res) => {
    try{
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

                studentId: Student.id,//fix this
                //Student: {
                //  connect: { id: Student.id },  
                //},
                //
                //have to figure out how to make the below code work
                //studentId: parseInt(studentID),
            },
        });
        res.json(studentTracker)
    }catch(error){
        res.status(500).json({ error: "Error 500" });
    }

  
});

//running on different port bc it works for some reason
const server = app.listen(3006, () =>
  console.log(`Server ready at: http://localhost:3006`),
)