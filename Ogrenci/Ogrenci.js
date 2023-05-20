import * as React from 'react';
import {useEffect, useState} from 'react';
import './Ogrenci.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import Toast from "react-bootstrap/Toast";

export const Ogrenci = () => {

    const studentId = localStorage.getItem("id");
    const name = localStorage.getItem("ogrenciAdi");
    const surname = localStorage.getItem("ogrenciSoyadi");
    const [courses, setCourses] = useState([]);
    const [attendances, setAttendance] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const history = useHistory();
    const [status,setStatus] = useState("");
    const handleLogout = () => {
        localStorage.clear();
        history.push("/"); // Login sayfasına yönlendirme
    };
    const handleYoklamayaKatil = (dersKodu) => {
        console.log(dersKodu);
        console.log(studentId);
        axios.post('http://localhost:8080/api/yoklama/getYoklamaDurumu', {
            dersKodu: dersKodu,
            studentId: studentId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            setStatus(res.data);
            if (res.data===false)
            {
                setToastMessage("Dersin yoklaması aktif değil!");
                setShowToast(true);
            }
            else{
                setToastMessage("Yoklamanız başarıyla kaydedildi.");
                setShowToast(true);
            }
        }).catch(err => {
            setToastMessage("fgfgjfj");
            setShowToast(true);
            console.log(err);
        });


    }
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


    return (
        <div>
            <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                   style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
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
                        <th>İzin Sayısı</th>
                        <th>Yoklama</th>

                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => {
                        const yoklama = attendances.find(yoklama => yoklama.dersKodu.dersKodu === course.dersKodu);
                        const devamsizlikSayisi = yoklama ? yoklama.devamsizlikSayisi : 0;
                        const izin = attendances.find(yoklama => yoklama.dersKodu.dersKodu === course.dersKodu);
                        const izinSayisi = izin ? izin.izinSayisi : 0;
                        return (
                            <tr>
                                <td>{course.dersKodu}</td>
                                <td>{course.dersAdi}</td>
                                <td style={{
                                    color: "white",
                                    backgroundColor: getBackgroundColor(devamsizlikSayisi)
                                }}>{devamsizlikSayisi}</td>
                                <td>{izinSayisi}</td>
                                <td>
                                    <Button onClick={() => {
                                        handleYoklamayaKatil(course.dersKodu)
                                    }}>Yoklamaya Katıl</Button>

                                </td>
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
