import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from '../core/AuthContext';
const url = "http://localhost:3000/users";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const { user } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();

    useEffect(() => {

        const readStudentInfo = async () => {
            try {
                const response = await fetch(`${url}/${user.userId}`);
                if (!response.ok) {
                    throw Error("There was a problem connecting to the database!");
                }
                const data = await response.json();
                setProfile(data);
                
                console.log("printing Profile variable "+Profile);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
        if (user===null) {
            navigate('/login');
        } else {
            readStudentInfo();
        }
    }, []);
  return (
    <>
        { profile && <section>
            <p><strong>First Name:</strong> {profile.first_name }</p>

            <p><strong>Last Name:</strong> {profile.last_name }</p>
            <p><strong>E-mail:</strong> {profile.email}</p>
            <p><strong>Birthdate:</strong> {profile.birth_date}</p>
            
        </section> }
    </>
  )
}

export default Profile