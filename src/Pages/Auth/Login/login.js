import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, InputGroup, Button } from "react-bootstrap";
import classes from "../index.module.scss";
import emailsvg from "../../../Images/email.svg";
import Lock from "../../../Images/Lock.svg";
import {Link, useNavigate} from "react-router-dom";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import Loader from "Components/Loader";
import { LOGIN_SUCCESS } from "actions/types";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const dispatch = useDispatch();

    const [userEmail, setUserEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [user_fcm_token, setfcm_token] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

   /* const fcm_token = getToken();

    fcm_token.then(function (result) {
        setfcm_token(result);
        console.log(result);
    });*/

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const signinToEmailHome = async (e) => {
        setIsLoading(true);

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            e.preventDefault();
            AuthService.postMethod(ENDPOINT.login, false, {
                email: userEmail,
                password: password,
                fcm_token: user_fcm_token,
            })
            .then((res) => {
      
                console.log(res);
                localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
                //localStorage.setItem("token", JSON.stringify(res.data.user));
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: res.data.user },
                });

                setTimeout(function () {
                    // setIsLoading(false);
                    goToDashboard("/dashboard");
                }, 1000);
            })
            .catch((err) => {
                //  if (res.response === 201) {
                //     toast.success(res.data.message);
                // }
                setIsLoading(false);
                swal("Error", `${AuthService.errorMessageHandlerLogin(err)}`, "error");
            });
        }
    };

    if (isLoading == true)
        return <Loader isLoading={isLoading} />;

    return (
            <div className={classes.formBox}>
                <h1>Sign in to Manage.</h1>
                <p className={"font-18 mb-5"}>Enter your detail below</p>
                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3" controlId="loginemail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                                <img src={emailsvg} alt={"goWild"} align={"img"}/>
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                onChange={(e) => {
                                    setUserEmail(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginpassword">
                        <Form.Label>Password</Form.Label>
                        <Link  to={"/rigister-email"}  style={{float: "right"}}>Forget Password ?</Link>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                                <img src={Lock} alt={"img"}/>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className={"mb-3"} controlId="formBasicCheckbox">
                        <Button
                            variant="primary"
                            type="submit"
                            className={"w-100"}
                            onClick={signinToEmailHome}
                        >
                            Log In
                        </Button>
                    </Form.Group>
                    {/* <Form.Group className={"text-center mb-3"}>
                        <Link to={"/forgetpassword"}>Forget Password ?</Link>
                    </Form.Group> */}
                    {/*<Form.Group className={"d-md-flex justify-content-between"}>
                        <Link to={"/"}>Privacy policy</Link>
                        <Link to={"/"}>Terms and conditions</Link>
                    </Form.Group>*/}
                </Form>

            </div>
        );

};

export default Login;
