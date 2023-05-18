import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export const AdminLogin = () => {
    const [username,setUsernameAdmin] = useState("");
    const [password,setPasswordAdmin] = useState("");

    const handleSubmitAdmin = (event) =>{
        event.preventDefault();
        console.log('geldi');

        axios.post('http://localhost:8080/api/user/checkLogin', {
            username,
            password,
            role:"ADMIN"
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.data.body.status === true) {
                window.location.href="/admin";
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
                    <Form.Control type="username" placeholder="Kullanıcı Adı" onChange={event => {
                        setUsernameAdmin(event.target.value)
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Şifre" onChange={event => {
                        setPasswordAdmin(event.target.value)
                    }}/>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmitAdmin}>
                    Giriş Yap
                </Button>
            </Form>
        </div>
    );
};

export default AdminLogin;