import React, { useState, useContext } from 'react';
import './login.css'
import server from '../../shared/server'
import { Redirect } from 'react-router-dom'
import ActiveUserContext from '../../shared/activeUserContext'
import logoImg from '../../assets/images/logo.png'
import AlertComp from '../../components/alertComp/AlertComp';


const LoginPage = (props) => {
    const { handleLogin } = props;
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [alertErrMsg, setAlertErrMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const activeUser = useContext(ActiveUserContext);


    const login = () => {

        if (!email) {
            setAlertErrMsg("מייל אינו תקין");
            setShowAlert(true)
            return;
        }
        if (!pwd) {
            setAlertErrMsg("סיסמה שגויה");
            setShowAlert(true)
            return;
        }

        const data = { email, pass: pwd };
        server(null, data, "login").then(res => {
            console.log(res);
            if (res.data.error) {
                setAlertErrMsg("משתמש זה אינו קיים");
                setShowAlert(true)
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

    const handleClose = () => {
        setShowAlert(false)

    }


    return (
        <>
            <div className="p-login">
                <div className="contetnt">
                    <img className="imgLogo" src={logoImg} />
                    <form>
                        <input className="emailInput" value={email} type="email" placeholder="אימייל" onChange={e => setEmail(e.target.value)} />
                        <input className="pwdInput" value={pwd} type="password" placeholder="סיסמה" onChange={e => setPwd(e.target.value)} />
                        <button className="button" variant="primary" type="button" onClick={login}>
                            התחבר
                    </button>
                    </form>


                </div>
                {showAlert ? <AlertComp message={alertErrMsg} type="error" closeFunction={handleClose} /> : null}
 
            </div>

        </>
    );
}

export default LoginPage;