import React, {useEffect, useState} from "react";
import "./Admin.css"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import {useHistory} from "react-router-dom";

export const Admin = () => {

    const [ogrenciAdi, setOgrenciAd] = useState("");
    const [ogrenciSoyadi, setOgrenciSoyad] = useState("");
    const [ogrenciAdiUpdate, setOgrenciAdUpdate] = useState("");
    const [ogrenciSoyadiUpdate, setOgrenciSoyadUpdate] = useState("");
    const [ogrenci_no, setOgrenciNo] = useState("");
    const [ogrenci_noUpdate, setOgrenciNoUpdate] = useState("");

    const [ogrenci_TC, setOgrenciTc] = useState("");

    const [ogretmenAdi, setOgretmenAd] = useState("");
    const [ogretmenSoyadi, setOgretmenSoyad] = useState("");
    const [ogretmen_no, setOgretmenNo] = useState("");
    const [ogretmen_TC, setOgretmenTc] = useState("");
    const [admins, setAdmins] = useState([]);

    const [username, setKullaniciAd] = useState("");
    const [password, setSifre] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [role, setKullaniciRol] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [dersAdi, setdersAdi] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [dersAdiUpdate, setdersAdiUpdate] = useState("");

    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [idTutTeacher, setidTutTeacher] = useState("");
    const [idTutStudent, setidTutStudent] = useState("");
    const [idTutCourse, setidTutCourse] = useState("");
    const [idTutAdmin, setidTutAdmin] = useState("");

    const [students, setStudent] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    const [courses, setCourse] = useState([]);
    const [selectedCourse, setSelectedCourses] = useState("");
    const [selectedCourseUpdate, setselectedCourseUpdate] = useState("");
    const [studentuserid, setStudentUserid] = useState("");
    const [selectedStudentDelete, setselectedStudentDelete] = useState("");
    const [selectedCourseDelete, setSelectedCourseDelete] = useState("");

    const [teacherUserid, setTeacherUserid] = useState("");
    const [selectedTeacherDelete, setSelectedTeacherDelete] = useState("");

    const [showUpdateAdmin, sethandleShowAdmin] = useState(false);
    const handleShowAdmin = () => sethandleShowAdmin(true);
    const handleCloseAdmin = () => sethandleShowAdmin(false);

    const [showUpdateStudent, sethandleShowStudent] = useState(false);
    const handleShowStudent = () => sethandleShowStudent(true);
    const handleCloseStudent = () => sethandleShowStudent(false);

    const [showUpdateTeacher, sethandleShowTeacher] = useState(false);
    const handleShowTeacher = () => sethandleShowTeacher(true);
    const handleCloseTeacher = () => sethandleShowTeacher(false);

    const [showUpdateCourse, sethandleShowCourse] = useState(false);
    const handleShowCourse = () => sethandleShowCourse(true);
    const handleCloseCourse = () => sethandleShowCourse(false);

    const [showDeleteStudent, sethandleShowStudentDel] = useState(false);
    const handleShowDeleteStudent = () => sethandleShowStudentDel(true);
    const handleCloseDeleteStudent = () => sethandleShowStudentDel(false);

    const [showDeleteTeacher, sethandleShowTeacherDel] = useState(false);
    const handleShowDeleteTeacher = () => sethandleShowTeacherDel(true);
    const handleCloseDeleteTeacher = () => sethandleShowTeacherDel(false);

    const [showDeleteCourse, sethandleShowCourseDel] = useState(false);
    const handleShowDeleteCourse = () => sethandleShowCourseDel(true);
    const handleCloseDeleteCourse = () => sethandleShowCourseDel(false);
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/"); // Login sayfasına yönlendirme
    };
    useEffect(() => {
    }, [role]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/teacher/getTeachers')
            .then(res => {
                setTeachers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [selectedTeacher, teachers]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/student/getStudents')
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [idTutStudent, students]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/course/getCourses')
            .then(res => {
                setCourse(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [idTutCourse, courses]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/getAdmins')
            .then(res => {
                setAdmins(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [idTutAdmin, admins]);

    const handleUserSubmit = (event) => {
        event.preventDefault();
        if (role === "OGRENCI") {
            axios.post('http://localhost:8080/api/student/saveStudent', {
                ogrenciAdi,
                ogrenciSoyadi,
                ogrenci_no,
                ogrenci_TC,
                user: {
                    username: ogrenci_no,
                    password: ogrenci_TC,
                    role
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setToastMessage("Öğrenci başarıyla kaydedildi.");
                setShowToast(true);
                setOgrenciAd("");
                setOgrenciSoyad("");
                setOgrenciNo("");
                setOgrenciTc("");
                setKullaniciAd("");
                setSifre("");
            }).catch(err => {
                setToastMessage("Öğrenci kaydetme işlemi başarısız oldu.");
                setShowToast(true);
                console.log(err);
            })
        }
        if (role === 'OGRETMEN') {
            axios.post('http://localhost:8080/api/teacher/saveTeacher', {
                ogretmenAdi,
                ogretmenSoyadi,
                ogretmen_no,
                ogretmen_TC,
                user: {
                    username: ogretmen_no,
                    password: ogretmen_TC,
                    role
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setToastMessage("Öğretmen başarıyla kaydedildi.");
                setShowToast(true);
                setOgretmenAd("");
                setOgretmenSoyad("");
                setOgretmenNo("");
                setOgretmenTc("");
                setKullaniciAd("");
                setSifre("");
            }).catch(err => {
                setToastMessage("Öğretmen kaydetme işlemi başarısız oldu.");
                setShowToast(true);
                console.log(err);
            })

        }
        if (role === "ADMIN") {
            axios.post('http://localhost:8080/api/admin/saveAdmin', {
                username,
                password,
                user: {
                    username,
                    password,
                    role
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setToastMessage("Admin başarıyla kaydedildi.");
                setKullaniciAd("");
                setSifre("");
            }).catch(err => {
                setToastMessage("Admin kaydetme işlemi başarısız oldu.");
                setShowToast(true);
                console.log(err);
            })
        }
    }
    const handleDersSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/course/saveCourse', {
            dersAdi,
            teacher: {id: idTutTeacher}

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Ders başarıyla kaydedildi.");
            setShowToast(true);
            setdersAdi("");
            setSelectedTeacher("");
        }).catch(err => {
            setToastMessage("Ders kayıt başarısız.");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleStudentCourseSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/studentCourse/students/${idTutStudent}/courses`, {
            dersKodu: idTutCourse
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Ders ilgili öğrenciye başarıyla atandı.");
            setShowToast(true);
            setSelectedCourses("");
            setSelectedStudent("");
        }).catch(err => {
            setToastMessage("Ders atama başarısız.");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleStudentUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/api/student/updateStudent', {
            id: idTutStudent,
            ogrenciAdi:ogrenciAdiUpdate,
            ogrenciSoyadi:ogrenciSoyadiUpdate,
            ogrenci_no:ogrenci_noUpdate

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Öğrenci bilgileri başarıyla güncellendi.");
            setShowToast(true);
            setOgrenciSoyadUpdate("");
            setOgrenciAdUpdate("");
            setOgrenciNoUpdate("");
        }).catch(err => {
            setToastMessage("Güncelleme başarısız oldu");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleTeacherUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/api/teacher/updateTeacher', {
            id: idTutTeacher,
            ogretmenAdi,
            ogretmenSoyadi,
            ogretmen_no
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Öğretmen bilgileri başarıyla güncellendi.");
            setShowToast(true);
        }).catch(err => {
            setToastMessage("Güncelleme başarısız oldu");
            setShowToast(true);
            console.log(err);
        })
    }

    const handleAdminUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/api/admin/updateAdmin', {
            id: idTutAdmin,
            username,
            oldPassword,
            newPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Admin bilgileri başarıyla güncellendi.");
            setShowToast(true);
            setKullaniciAd("");
            setOldPassword("");
            setNewPassword("");
        }).catch(err => {
            setToastMessage("Güncelleme başarısız oldu");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleCourseUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/api/course/updateCourse', {
            dersKodu: idTutCourse,
            dersAdi: dersAdiUpdate

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Ders bilgileri başarıyla güncellendi.");
            setShowToast(true);
        }).catch(err => {
            setToastMessage("Güncelleme başarısız oldu");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleStudentDelete = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/student/deleteStudent', {
            id: idTutStudent,
            userid: studentuserid

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Öğrenci bilgileri başarıyla silindi.");
            setShowToast(true);
            setselectedStudentDelete("");

        }).catch(err => {
            setToastMessage("Silme işlemi başarısız oldu.");
            setShowToast(true);
            console.log(err);
        })
    }

    const handleTeacherDelete = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/teacher/deleteTeacher', {
            id: idTutTeacher,
            userid: teacherUserid

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Öğretmen bilgileri başarıyla silindi.");
            setShowToast(true);
            setSelectedTeacherDelete("");

        }).catch(err => {
            setToastMessage("Silme işlemi başarısız oldu.");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleCourseDelete = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/course/deleteCourse', {
            dersKodu: idTutCourse,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setToastMessage("Ders bilgileri başarıyla silindi.");
            setShowToast(true);
            setSelectedCourseDelete("");
        }).catch(err => {
            setToastMessage("Ders silme işlemi başarısız oldu.");
            setShowToast(true);
            console.log(err);
        })
    }
    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setidTutTeacher(option);

    }
    const handleStudentChangeForUpdate = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const ogrenciId = el.getAttribute('id');
        setidTutStudent(ogrenciId);
        console.log(ogrenciId)
        const option = e.target.childNodes[index].textContent.trim();
        const [ogrenciNo, ogrenciAdSoyad] = option.split('-');
        const [ogrenciAdi, ...ogrenciSoyadiArr] = ogrenciAdSoyad.trim().split(' ');
        const ogrenciSoyadi = ogrenciSoyadiArr.join(' ');
        setOgrenciNoUpdate(ogrenciNo.trim());
        setOgrenciAdUpdate(ogrenciAdi.trim());
        setOgrenciSoyadUpdate(ogrenciSoyadi.trim());
    }
    const handleTeacherChangeForUpdate = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const ogretmenId = el.getAttribute('id');
        setidTutTeacher(ogretmenId);
        console.log(ogretmenId)
        const option = e.target.childNodes[index].textContent.trim();
        const [ogretmenNo, ogretmenAdSoyad] = option.split('-');
        const [ogretmenAdi, ...ogretmenSoyadiArr] = ogretmenAdSoyad.trim().split(' ');
        const ogretmenSoyadi = ogretmenSoyadiArr.join(' ');
        setOgretmenNo(ogretmenNo.trim());
        setOgretmenAd(ogretmenAdi.trim());
        setOgretmenSoyad(ogretmenSoyadi.trim());
        console.log(ogretmenNo)
        console.log(ogretmenAdi)
        console.log(ogretmenSoyadi)

    }

    const handleAdminChangeForUpdate = (e) => {
        const index = e.target.selectedIndex;
        const option = e.target.childNodes[index].textContent.trim();
        const [id, username] = option.split('-');
        setKullaniciAd(username);
        setidTutAdmin(id);
    }
    const handleCourseChangeForUpdate = (e) => {
        setselectedCourseUpdate(e.target.value);
        const index = e.target.selectedIndex;
        const option = e.target.childNodes[index].textContent.trim();
        const [id, courseName] = option.split('-');
        setdersAdiUpdate(courseName);
        setidTutCourse(id);
        console.log(courseName)
        console.log(id);
    }
    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value)
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const ogrenciId = el.getAttribute('id');
        setidTutStudent(ogrenciId);
        console.log(ogrenciId)

    }
    const handleCourseChange = (e) => {
        setSelectedCourses(e.target.value);
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setidTutCourse(option);
        console.log(option)
    }
    const handleStudentChangeForDelete = (e) => {
        setselectedStudentDelete(e.target.value)
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const ogrenciId = el.getAttribute('id');
        setidTutStudent(ogrenciId);
        const userid = students[index - 1].user.id;
        setStudentUserid(userid);

    }
    const handleTeacherChangeForDelete = (e) => {
        setSelectedTeacherDelete(e.target.value)
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const ogretmenId = el.getAttribute('id');
        setidTutTeacher(ogretmenId);
        const userid = teachers[index - 1].user.id;
        setTeacherUserid(userid);

    }
    const handleCourseChangeForDelete = (e) => {
        setSelectedCourseDelete(e.target.value)
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const courseId = el.getAttribute('id');
        setidTutCourse(courseId);
    }


    return (
        <div>
            <div className="headers">
                <Button variant="secondary" onClick={handleLogout}>
                    Çıkış Yap
                </Button>
            </div>

            <Form className="adminForm">
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Row>
                    <Col md={4}>
                        <Form.Control placeholder="Öğrenci adı"
                                      value={ogrenciAdi}
                                      onChange={event => {
                                          setOgrenciAd(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRENCI' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>

                    <Col md={4}>
                        <Form.Control placeholder="Öğrenci soyadı"
                                      value={ogrenciSoyadi}
                                      onChange={event => {
                                          setOgrenciSoyad(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRENCI' ? 'visible' : 'hidden'}
                                      }/>

                    </Col>
                    <Col md={4}>
                        <Form.Control type="number"
                                      placeholder="Öğrenci numarası"
                                      value={ogrenci_no}
                                      pattern="[0-9]{9}$"
                                      maxLength={12}
                                      onChange={event => {
                                          setOgrenciNo(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRENCI' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number"
                                      placeholder="Öğrenci TC"
                                      value={ogrenci_TC}
                                      pattern="[0-9]{9}$"
                                      maxLength={12}
                                      onChange={event => {
                                          setOgrenciTc(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRENCI' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form.Control placeholder="Öğretmen adı"
                                      value={ogretmenAdi}
                                      onChange={event => {
                                          setOgretmenAd(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRETMEN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}>
                        <Form.Control placeholder="Öğretmen soyadı"
                                      value={ogretmenSoyadi}
                                      onChange={event => {
                                          setOgretmenSoyad(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRETMEN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>

                    <Col md={4}>
                        <Form.Control type="number"
                                      placeholder="Öğretmen numarası"
                                      value={ogretmen_no}
                                      pattern="[0-9]{9}$"
                                      maxLength={12}
                                      onChange={event => {
                                          setOgretmenNo(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRETMEN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number"
                                      placeholder="Öğretmen TC"
                                      value={ogretmen_TC}
                                      pattern="[0-9]{9}$"
                                      maxLength={12}
                                      onChange={event => {
                                          setOgretmenTc(event.target.value)
                                      }}
                                      style={{visibility: role === 'OGRETMEN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form.Control placeholder="Kullanıcı adı(Login)"
                                      value={username}
                                      onChange={event => {
                                          setKullaniciAd(event.target.value)
                                      }}
                                      style={{visibility: role === 'ADMIN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="password" placeholder="Şifre"
                                      value={password}
                                      onChange={event => {
                                          setSifre(event.target.value)
                                      }}
                                      style={{visibility: role === 'ADMIN' ? 'visible' : 'hidden'}
                                      }/>
                    </Col>
                    <Col>
                        <Form.Select onChange={event => {
                            setKullaniciRol(event.currentTarget.value)
                        }}>
                            <option>Kullanıcı rolü seç</option>
                            <option value="OGRENCI">ÖĞRENCİ</option>
                            <option value="OGRETMEN">ÖĞRETMEN</option>
                            <option value="ADMIN">ADMİN</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleUserSubmit}>
                            Kullanıcıyı kaydet
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Form className="dersForm">
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Row>
                    <Col md={4}>
                        <Form.Control placeholder="Ders adı"
                                      value={dersAdi}
                                      onChange={event => {
                                          setdersAdi(event.target.value)
                                      }}/>
                    </Col>
                    <Col md={4}>
                        <Form.Select value={selectedTeacher} onChange={handleTeacherChange}>
                            <option value="" disabled>İlgili dersi verecek öğretmeni seçiniz</option>
                            {teachers.map((teacher) => (
                                <option id={teacher.id}
                                        key={teacher.id}
                                        value={teacher.id}>{teacher.ogretmen_no} - {teacher.ogretmenAdi} {teacher.ogretmenSoyadi}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleDersSubmit}>
                            Dersi kaydet
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Form className="ogrenciDersForm">
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Row>
                    <Col md={4}>
                        <Form.Select value={selectedStudent} onChange={handleStudentChange}>
                            <option value="" disabled>Ders atanacak öğrenciyi seçiniz</option>
                            {students.map((student) => (
                                <option id={student.id}
                                        key={student.id}
                                        value={student.id}>{student.ogrenci_no} - {student.ogrenciAdi} {student.ogrenciSoyadi}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Select value={selectedCourse} onChange={handleCourseChange}>
                            <option value="" disabled>Öğrenciye atamak istediğiniz dersi seçiniz</option>
                            {courses.map((course) => (
                                <option id={course.dersKodu}
                                        key={course.dersKodu}
                                        value={course.dersKodu}>{course.dersKodu} - {course.dersAdi}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col>
                        <Button variant="primary" onClick={handleStudentCourseSubmit}>
                            Ders ata
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Button variant="primary" onClick={handleShowStudent}>
                Öğrenci güncelle
            </Button>

            <Modal show={showUpdateStudent} onHide={handleCloseStudent}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Öğrenci bilgisi güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={idTutStudent} onChange={handleStudentChangeForUpdate}>
                                <option value="" disabled>Güncellemek istediğiniz öğrenciyi seçiniz</option>
                                {students.map((student) => (
                                    <option id={student.id}
                                            key={student.id}
                                            value={student.id}>{student.ogrenci_no} - {student.ogrenciAdi} {student.ogrenciSoyadi}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Öğrenci Adı"
                                          value={ogrenciAdiUpdate}
                                          aria-required={true}
                                          onChange={event => {
                                              setOgrenciAdUpdate(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Öğrenci Soyadı"
                                          value={ogrenciSoyadiUpdate}
                                          aria-required={true}
                                          onChange={event => {
                                              setOgrenciSoyadUpdate(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number"
                                          placeholder="Öğrenci Numarası"
                                          value={ogrenci_noUpdate}
                                          onChange={event => {
                                              setOgrenciNoUpdate(event.target.value)
                                          }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStudent}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleStudentUpdate}>
                        Güncelle
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={handleShowTeacher}>
                Öğretmen güncelle
            </Button>

            <Modal show={showUpdateTeacher} onHide={handleCloseTeacher}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Öğretmen bilgisi güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={idTutTeacher} onChange={handleTeacherChangeForUpdate}>
                                <option value="" disabled>Güncellemek istediğiniz öğretmeni seçiniz</option>
                                {teachers.map((teacher) => (
                                    <option id={teacher.id}
                                            key={teacher.id}
                                            value={teacher.id}>{teacher.ogretmen_no} - {teacher.ogretmenAdi} {teacher.ogretmenSoyadi}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Öğretmen Adı"
                                          value={ogretmenAdi}
                                          aria-required={true}
                                          onChange={event => {
                                              setOgretmenAd(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Öğretmen Soyadı"
                                          value={ogretmenSoyadi}
                                          aria-required={true}
                                          onChange={event => {
                                              setOgretmenSoyad(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number"
                                          placeholder="Öğretmen Numarası"
                                          onChange={event => {
                                              setOgretmenNo(event.target.value)
                                          }}
                                          value={ogretmen_no}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTeacher}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleTeacherUpdate}>
                        Güncelle
                    </Button>
                </Modal.Footer>
            </Modal>


            <Button variant="primary" onClick={handleShowAdmin}>
                Admin güncelle
            </Button>
            <Modal show={showUpdateAdmin} onHide={handleCloseAdmin}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Admin bilgisi güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={idTutAdmin} onChange={handleAdminChangeForUpdate}>
                                <option value="" disabled>Güncellemek istediğiniz admini seçiniz</option>
                                {admins.map((admin) => (
                                    <option id={admin.id}
                                            key={admin.id}
                                            value={admin.id}>{admin.id}-{admin.username}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Kullanıcı Adı"
                                          value={username}
                                          aria-required={true}
                                          onChange={event => {
                                              setKullaniciAd(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password"
                                          placeholder="Eski Şifre"
                                          aria-required={true}
                                          value={oldPassword}
                                          onChange={event => {
                                              setOldPassword(event.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password"
                                          placeholder="Yeni Şifre"
                                          aria-required={true}
                                          value={newPassword}
                                          onChange={event => {
                                              setNewPassword(event.target.value)
                                          }}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdmin}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleAdminUpdate}>
                        Güncelle
                    </Button>
                </Modal.Footer>
            </Modal>


            <Button variant="primary" onClick={handleShowCourse}>
                Ders güncelle
            </Button>
            <Modal show={showUpdateCourse} onHide={handleCloseCourse}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Ders adı güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={selectedCourseUpdate} onChange={handleCourseChangeForUpdate}>
                                <option value="" disabled>Güncellemek istediğiniz dersi seçiniz</option>
                                {courses.map((course) => (
                                    <option id={course.ders_Kodu}
                                            key={course.ders_Kodu}
                                            value={course.ders_Kodu}>{course.dersKodu}-{course.dersAdi}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                          placeholder="Ders Adı"
                                          value={dersAdiUpdate}
                                          aria-required={true}
                                          onChange={event => {
                                              setdersAdiUpdate(event.target.value)
                                          }}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCourse}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleCourseUpdate}>
                        Güncelle
                    </Button>
                </Modal.Footer>
            </Modal>


            <Button variant="danger" onClick={handleShowDeleteStudent}>
                Öğrenci Sil
            </Button>
            <Modal show={showDeleteStudent} onHide={handleCloseDeleteStudent}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Öğrenci sil <b><small>(Silinecek öğrenci geri alınamaz!)</small></b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={selectedStudentDelete} onChange={handleStudentChangeForDelete}>
                                <option value="" disabled>Silmek istediğiniz öğrenciyi seçiniz</option>
                                {students.map((student) => (
                                    <option id={student.id}
                                            key={student.id}
                                            value={student.id}>{student.ogrenci_no} - {student.ogrenciAdi} {student.ogrenciSoyadi}</option>
                                ))}
                            </Form.Select>
                        </Col>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteStudent}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={handleStudentDelete}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>


            <Button variant="danger" onClick={handleShowDeleteTeacher}>
                Öğretmen Sil
            </Button>
            <Modal show={showDeleteTeacher} onHide={handleCloseDeleteTeacher}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Öğretmen sil <b>(Silinecek öğretmen geri alınamaz!)</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={selectedTeacherDelete} onChange={handleTeacherChangeForDelete}>
                                <option value="" disabled>Silmek istediğiniz öğretmeni seçiniz</option>
                                {teachers.map((teacher) => (
                                    <option id={teacher.id}
                                            key={teacher.id}
                                            value={teacher.id}>{teacher.ogretmen_no} - {teacher.ogretmenAdi} {teacher.ogretmenSoyadi}</option>
                                ))}
                            </Form.Select>
                        </Col>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteTeacher}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={handleTeacherDelete}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="danger" onClick={handleShowDeleteCourse}>
                Ders Sil
            </Button>
            <Modal show={showDeleteCourse} onHide={handleCloseDeleteCourse}>
                <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={2000}
                       style={{background: "green", position: 'fixed', top: 0, right: 0}}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Modal.Header closeButton>
                    <Modal.Title>Ders sil <b>(Silinecek ders geri alınamaz!)</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Form.Select value={selectedCourseDelete} onChange={handleCourseChangeForDelete}>
                                <option value="" disabled>Silmek istediğiniz dersi seçiniz</option>
                                {courses.map((course) => (
                                    <option id={course.dersKodu}
                                            key={course.dersKodu}
                                            value={course.dersKodu}>{course.dersKodu} - {course.dersAdi}</option>
                                ))}
                            </Form.Select>
                        </Col>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteCourse}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={handleCourseDelete}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Admin;