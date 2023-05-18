import * as React from 'react';
import {useEffect, useState} from 'react';
import './Ogrenci.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

export const Ogrenci = () => {


    const studentId = localStorage.getItem("id");
    const name = localStorage.getItem("ogrenciAdi");
    const surname = localStorage.getItem("ogrenciSoyadi");
    const [courses, setCourses] = useState([]);
    const [attendances, setAttendance] = useState([]);

    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/"); // Login sayfasına yönlendirme
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/student/students/${studentId}/courses`)
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [studentId]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/yoklama/${studentId}`)
            .then(res => {
                setAttendance(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [studentId]);

    function getBackgroundColor(nOf_Attendance) {
        if (nOf_Attendance >= 4) {
            return "red";
        } else if (nOf_Attendance >= 2 && nOf_Attendance < 4) {
            return "orange";
        } else {
            return "green";
        }
    }

    const handleAttendance = (e) => {
        e.preventDefault();
        //db ye istek gidecek derse katıldım. devamsızlık sabit kalacak
    }
    return (
        <div>
            <div className="headers">
                <p><b> Hoşgeldiniz {name} {surname}</b></p>
                <Button variant="secondary" onClick={handleLogout}>
                    Çıkış Yap
                </Button>
            </div>

            <div className="ders-listesi">

                <table>
                    <thead>
                    <tr>
                        <th>Ders Kodu</th>
                        <th>Ders Adı</th>
                        <th>Devamsızlık Sayısı</th>
                        <th>Yoklama</th>

                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => {
                        const yoklama = attendances.find(yoklama => yoklama.dersKodu.dersKodu === course.dersKodu);
                        const devamsizlikSayisi = yoklama ? yoklama.devamsizlikSayisi : 0;
                        return (
                            <tr>
                                <td>{course.dersKodu}</td>
                                <td>{course.dersAdi}</td>
                                <td style={{color:"white", backgroundColor: getBackgroundColor(devamsizlikSayisi)}}>{devamsizlikSayisi}</td>
                                <td><Button onClick={handleAttendance}>Yoklamaya katıl</Button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Ogrenci;