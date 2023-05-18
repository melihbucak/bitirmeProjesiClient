import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import './Login.css';
import logo from '../../Esogu_logo.png';

const Login = () => {
    return (

        <div className="login">
            <h4>Eskişehir Osmangazi Üniversitesi Yoklama Sistemi</h4>
            <img className="esogu-logo" src={logo} alt={"img-esogu"}/>
            <div className="col-md-3 center login">
                <Link to="/ogrenciLogin">
                    <Button className="button" variant="primary">
                        Öğrenci Giriş
                    </Button>
                </Link>
                <Link to="/ogretmenLogin">
                    <Button className="button" variant="primary">
                        Öğretmen Giriş
                    </Button>
                </Link>
                <Link to="/adminLogin">
                    <Button className="button" variant="primary">
                        Admin Giriş
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default Login;