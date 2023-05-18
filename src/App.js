import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/LoginComponent/Login";
import OgrenciLogin from "./components/LoginComponent/OgrenciLogin/OgrenciLogin";
import AdminLogin from "./components/LoginComponent/AdminLogin/AdminLogin";
import Admin from "./components/YoklamaComponent/Admin/Admin";
import OgretmenLogin from "./components/LoginComponent/OgretmenLogin/OgretmenLogin";
import Ogrenci from "./components/YoklamaComponent/Ogrenci/Ogrenci";
import Ogretmen from "./components/YoklamaComponent/Ogretmen/Ogretmen";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/"  component={Login}/>
                        <Route exact path="/ogrenciLogin" component={OgrenciLogin}/>
                        <Route exact path="/ogretmenLogin" component={OgretmenLogin}/>
                        <Route exact path="/adminLogin" component={AdminLogin}/>
                        <Route exact path="/admin" component={Admin}/>
                        <Route exact path="/ogrenciYoklama" component={Ogrenci}/>
                        <Route exact path="/ogretmenYoklama" component={Ogretmen}/>

                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
