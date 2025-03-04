import { useState, useEffect } from "react";

const url = "http://localhost:3000/students";

const Students = () => {
    const [students, setStudents] = useState([]);
    
    const fetchStudents = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error("There was a problem connecting to the database!");
            }
            const students = await response.json();
            setStudents(students);

        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <table className="dataTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Birthdate</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                    <tr key={student.student_id}>
                        <td>{student.student_first_name + " " + student.student_last_name}</td>
                        <td>{student.email}</td>
                        <td>{student.birthdate}</td>
                        <td>
                            {student.gender}
                            {student.gender_other && <span> ({student.gender_other})</span>}
                        </td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5">Total number of students: <span>{students.length}</span></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Students