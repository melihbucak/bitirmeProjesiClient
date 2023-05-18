import React, {useState,useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";



export const OgretmenLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/teacher/getTeachers')
            .then(res => {
                setTeachers(res.data);
                // console.log(teachers);
            })
            .catch(err => {
                console.log(err);
            });
    }, [teachers]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/user/checkLogin', {
            username,
            password,
            role:"OGRETMEN"
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.data.body.status === true) {
                teachers.forEach((teacher) => {
                    if (teacher.user.id === res.data.body.result.id) {
                        localStorage.setItem("id",teacher.id);
                        localStorage.setItem("ogretmenAdi", teacher.ogretmenAdi);
                        localStorage.setItem("ogretmenSoyadi", teacher.ogretmenSoyadi);
                    }
                });
                window.location.href="/ogretmenYoklama";
            }
            console.log(res.data)
        }).catch(err => {
            console.log(err);
        })

    }


    return (
        <div className="form-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="username" placeholder="Öğretmen Numarası" onChange={event => {
                        setUsername(event.target.value)
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Şifre" onChange={event => {
                        setPassword(event.target.value)
                    }}/>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Giriş Yap
                </Button>
            </Form>
        </div>
    )
}
export default OgretmenLogin;