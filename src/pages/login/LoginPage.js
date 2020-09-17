import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import './login.css'
import server from '../../shared/server'
import { Redirect } from 'react-router-dom'
import ActiveUserContext from '../../shared/activeUserContext'
import logoImg from '../../assets/images/logo.png'

const LoginPage = (props) => {
    const { handleLogin } = props;
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const activeUser = useContext(ActiveUserContext);

    const login = () => {

        if (!email || !pwd) {
            alert("נא להזין פרטי משתמש");
            return;
        }

        const data = { email, pass: pwd };
        server(null, data, "login").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error in login");
            } else {
                handleLogin(res.data);
            }
        }, err => {
            console.error(err);
        })
    }

    if (activeUser) {
        return <Redirect to='/courses' />
    }



    return (

        <div className="p-login">
            <div className="margin">
                <img className="imgLogo" src={logoImg}/>
                <form>
                    <input className="emailInput" value={email} type="email" placeholder="אימייל" onChange={e => setEmail(e.target.value)} />
                    <input className="pwdInput" value={pwd} type="password" placeholder="סיסמה" onChange={e => setPwd(e.target.value)} />
                    <button className="button" variant="primary" type="button" onClick={login}>
                        התחבר
                    </button>
                </form>
                {}
            </div>
        </div>
    );
}

export default LoginPage;