import * as React from 'react';
import {useState, useEffect} from 'react';
import './Ogretmen.css';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import {useHistory} from "react-router-dom";

export const Ogretmen = () => {

        const name = localStorage.getItem("ogretmenAdi");
        const surname = localStorage.getItem("ogretmenSoyadi");
        const teacherId = localStorage.getItem("id");
        const [courses, setCourses] = useState([]);
        const [attendances, setAttendance] = useState([]);
        const [studentId, setStudentId] = useState("");
        const [students, setStudents] = useState([]);
        const [selectedCourse, setSelectedCourse] = useState("");
        const [selectedStudent, setselectedStudent] = useState("");
        const [selectedIzin, setselectedIzin] = useState("");
        const [selectedDevamsizlik, setselectedDevamsizlik] = useState("");

        const [showUpdateAttendance, setshowUpdateAttendance] = useState(false);
        const handleShowAttendance = () => setshowUpdateAttendance(true);
        const handleCloseAttendance = () => setshowUpdateAttendance(false);


        const [showToast, setShowToast] = useState(false);
        const [toastMessage, setToastMessage] = useState("");

        const history = useHistory();
        const handleLogout = () => {
            localStorage.clear();
            history.push("/"); // Login sayfasına yönlendirme
        };
        useEffect(() => {
            axios.get(`http://localhost:8080/api/course/getCourseByTeacher/${teacherId}`)
                .then(res => {
                    setCourses(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, [teacherId]);

        useEffect(() => {
            axios.get(`http://localhost:8080/api/teacher/${teacherId}/courses/${selectedCourse}/students`)
                .then(res => {
                    setStudents(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, [teacherId, selectedCourse]);

        useEffect(() => {
            axios.get('http://localhost:8080/api/yoklama/getAll')
                .then(res => {
                    setAttendance(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, [attendances]);

        const handleCourseSelect = (e) => {
            e.preventDefault();
            const selectedCourse = e.target.value;
            setSelectedCourse(selectedCourse);
        }

        function getBackgroundColor(nOf_Attendance) {
            if (nOf_Attendance >= 4) {
                return "red";
            } else if (nOf_Attendance >= 2 && nOf_Attendance < 4) {
                return "orange";
            } else {
                return "green";
            }
        }

        const handleAttendanceForCourse = (e) => {
            e.preventDefault();
            //db ye istek gidecek derse katıldım. devamsızlık sabit kalacak
        }

        const handleStudentChangeForUpdate = (e) => {
            const index = e.target.selectedIndex;
            const el = e.target.childNodes[index]
            const ogrenciId = el.getAttribute('id');
            setselectedStudent(ogrenciId)
            setStudentId(ogrenciId);
        }
        const handleAttendanceUpdate = (e) => {
            e.preventDefault();
            axios.put('http://localhost:8080/api/yoklama/updateAttendance', {
                devamsizlikSayisi: selectedDevamsizlik,
                izinSayisi: selectedIzin,
                studentId: studentId,
                dersKodu: selectedCourse
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setToastMessage("Yoklama bilgileri başarıyla güncellendi");
                setShowToast(true);
                setselectedDevamsizlik("");
                setselectedIzin("");
            })
                .catch(err => {
                    setToastMessage("Güncelleme işlemi sırasında bir hata oluştu!");
                    setShowToast(true);
                    console.log(err);
                });
        }
        return (
            <div>
                <div className="headers">
                    <p><b> Hoşgeldiniz {name} {surname}</b></p>
                    <Button variant="secondary" onClick={handleLogout}>
                        Çıkış Yap
                    </Button>
                </div>
                <div>
                    <Form.Select value={selectedCourse} onChange={handleCourseSelect}>
                        <option value="" disabled>İşlem yapmak istediğiniz dersi seçin</option>
                        {courses.map((course) => (
                            <option id={course.dersKodu}
                                    key={course.dersKodu}
                                    value={course.dersKodu}>{course.dersKodu} - {course.dersAdi}</option>
                        ))}
                    </Form.Select>
                    <div className="ogrenci-listesi">
                        <table>
                            <thead>
                            <tr>
                                <th>Öğrenci Adı</th>
                                <th>Öğrenci Soyadı</th>
                                <th>Öğrenci Numarası</th>
                                <th>Yoklama Durumu</th>
                                <th>İzin Sayısı</th>

                            </tr>
                            </thead>
                            <tbody>
                            {selectedCourse}
                            {students.map((student) => {
                                const studentAttendances = attendances.filter(yoklama => yoklama.student.id === student.id && yoklama.dersKodu.dersKodu === parseInt(selectedCourse));
                                const devamsizlikSayisi = studentAttendances.length > 0 ? studentAttendances[0].devamsizlikSayisi : 0;
                                const studentAttendances_ = attendances.filter(yoklama => yoklama.student.id === student.id && yoklama.dersKodu.dersKodu === parseInt(selectedCourse));
                                const izinSayisi = studentAttendances.length > 0 ? studentAttendances_[0].izinSayisi : 0;
                                return (
                                    <tr key={student.id}>
                                        <td>{student.ogrenciAdi}</td>
                                        <td>{student.ogrenciSoyadi}</td>
                                        <td>{student.ogrenci_no}</td>
                                        <td style={{
                                            color: "white",
                                            backgroundColor: getBackgroundColor(devamsizlikSayisi)
                                        }}>{devamsizlikSayisi}</td>
                                        <td>{izinSayisi}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <Button onClick={handleAttendanceForCourse}>Yoklama Başlat</Button>


                        <Button onClick={handleShowAttendance}>Yoklama Düzenle</Button>

                        <Modal show={showUpdateAttendance} onHide={handleCloseAttendance}>
                            <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                                   style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                                <Toast.Body>{toastMessage}</Toast.Body>
                            </Toast>
                            <Modal.Header closeButton>
                                <Modal.Title>Öğrenci yoklama güncelle</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Col>
                                        <Form.Select value={selectedStudent} onChange={handleStudentChangeForUpdate}>
                                            <option value="" disabled>Yoklama güncellemek için öğrenci seçiniz</option>
                                            {students.map((student) => (
                                                <option id={student.id}
                                                        key={student.id}
                                                        value={student.id}>{student.ogrenci_no} - {student.ogrenciAdi} {student.ogrenciSoyadi}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="number"
                                                      placeholder="Devamsızlık sayisi giriniz"
                                                      value={selectedDevamsizlik}
                                                      aria-required={true}
                                                      onChange={event => {
                                                          setselectedDevamsizlik(event.target.value)
                                                      }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="number"
                                                      placeholder="İzin sayısı giriniz"
                                                      value={selectedIzin}
                                                      aria-required={true}
                                                      onChange={event => {
                                                          setselectedIzin(event.target.value)
                                                      }}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleCloseAttendance}>
                                    İptal
                                </Button>
                                <Button variant="success" onClick={handleAttendanceUpdate}>
                                    Düzenle
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
;

export default Ogretmen;