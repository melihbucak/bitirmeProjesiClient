import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './OgrenciLogin.css'
import axios from "axios";

export const OgrenciLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [id,setId]= useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/student/getStudents')
            .then(res => {
                setStudents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [students]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/user/checkLogin', {
            username,
            password,
            role: "OGRENCI"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            if (res.data.body.status === true) {

                students.forEach((student) => {
                    if (student.user.id === res.data.body.result.id) {
                        localStorage.setItem("id",student.id);
                        localStorage.setItem("ogrenciAdi", student.ogrenciAdi);
                        localStorage.setItem("ogrenciSoyadi", student.ogrenciSoyadi);
                        console.log(student.id);
                    }
                });
                window.location.href="/ogrenciYoklama";
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="form-center">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="username" placeholder="Öğrenci Numarası" onChange={event => {
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
export default OgrenciLogin;