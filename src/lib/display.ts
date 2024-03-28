import {prisma} from "./db"

export async function getStudents() {
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

    const formattedStudents = student.flatMap(student => {
        return student.StudentTracker.map(tracker=>({
            fullname: `${student.firstName} ${student.lastName}`,
            className: tracker.className,
            checkInTime: tracker.checkInTime
        }));
        
    });
    return formattedStudents
    } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
    }
} 