import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, InputGroup, Button } from "react-bootstrap";
import classes from "../index.module.scss";
import emailsvg from "../../../Images/email.svg";
import Lock from "../../../Images/Lock.svg";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "config/constants";
import AuthService from "services/auth.service";
import Loader from "Components/Loader";
import { LOGIN_SUCCESS } from "actions/types";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterEmail = () => {
//   const dispatch = useDispatch();

//   const [userEmail, setUserEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user_fcm_token, setfcm_token] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const signinToEmailHome = async (e) => {
        navigate("/forget-Password");
    // setIsLoading(true);

    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // } else {
    //   e.preventDefault();
    //   setValidated(true);

    //   AuthService.postMethod(ENDPOINT.login, false, {
    //     email: userEmail,
    //     password: password,
    //     fcm_token: user_fcm_token,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    //       localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
    //       dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: { user: res.data.user },
    //       });

    //       setTimeout(function () {
    //         setIsLoading(false);
    //         navigate("/");
    //       }, 1000);
    //     })
    //     .catch((err) => {
    //       setIsLoading(false);
    //       swal("Error", `${AuthService.errorMessageHandlerLogin(err)}`, "error");
    //     });
    // }
  };

//   if (isLoading === true) return <Loader isLoading={isLoading} />

    return (
            <div className={classes.formBox}>
                <h1>Reset Password</h1>
                <p className={"font-18 mb-5"}>Enter your detail below</p>
                <Form 
                //  noValidate validated={validated}
                 >
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
                                // onChange={(e) => {
                                //     setUserEmail(e.target.value);
                                // }}
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
                            Reset
                        </Button>
                    </Form.Group>

                </Form>

            </div>
        );

};

export default RegisterEmail;
