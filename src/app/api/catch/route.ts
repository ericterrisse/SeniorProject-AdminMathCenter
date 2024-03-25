import {ClassName, Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const cors = require('cors');


const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/catch', async (req, res) => {
    try {
      //data in this order
      const { fullname, classId , studentId } = req.body;
  
      //split up first and last name from 'fullname'
      const [firstName, ...lastNameParts] = fullname.split(' ');
      const lastName = lastNameParts.join(' ');
  
      //find student with the unique studentId
      const student = await prisma.student.findUnique({
        where: { studentId },
      });
  
      //create student if it doesn't already exist
      if (!student) {
        const newStudent = await prisma.student.create({
          data: {
            studentId,
            firstName,
            lastName,
          },
        });
  
        //making studentTracker with relationship to newStudent
        await prisma.studentTracker.create({
          data: {
            className: classId as ClassName,
            checkInTime: new Date(),
            student: { connect: { id: newStudent.id } },
          },
        });
      } else {

        //making studentTracker with relationship with existing student
        await prisma.studentTracker.create({
          data: {
            className: classId as ClassName,
            checkInTime: new Date(),
            student: { connect: { id: student.id } },
          },
        });
      }
  
      res.status(200).json({ message: 'check-in successful' }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error 500' });
    }
  });
  
const server = app.listen(3006, () =>
  console.log(`Server ready at: http://localhost:3006`),
)
