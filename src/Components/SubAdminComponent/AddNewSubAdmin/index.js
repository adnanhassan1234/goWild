import React, { useState , useEffect} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import classes from "../index.module.scss";
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddSubAdmin = (props) => {

    const [addAdmin, setAddAdmin] = useState(false);

    const navigate = useNavigate();

    const schema = object().shape({
        firstName: string().required(),
        lastName: string().required(),
        email: string().lowercase().required(),
        
        userName: string().required(),
        addressOne: string().required(),
       // phoneNo: string().required(),
        birthDate: string().required(),
        password: string().required(),
    });

    // function validateEmail(email) {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    //   }

            

    const handleSubmit = async (data) => {
        return await AuthService.postMethod(ENDPOINT.sub_admin.add_user, true, data)
            .then((res) => {
                   if (res.status === 201) {
                    toast.success('Created form successfully!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }

                props.subAdminAllData()
                setTimeout(() => {
                    setAddAdmin(props.onHide);
                  }, 1000);
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandlerSubAdmin(err)}`, "error");
            });
    }


   /* useEffect(() => {
        handleSubmit();
    }, []);*/
    
    
    return (
        <>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>

                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            userName: '',
                            addressOne: '',
                            birthDate: '',
                           // phoneNo: '',
                            password: ""
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row clssName="feedBack">
                                    <Col md={6}>
                                        <div className={classes.box}>
                                            <h3 className={"font-20 text-orange mb-3"}>Perosnal Information</h3>
                                            <Row>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>First Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="firstName"
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        placeholder="Enter First Name"
                                                        // isValid={touched.firstName && !errors.firstName}
                                                        isInvalid={!!errors.firstName && touched.firstName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.firstName}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="lastName"
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Enter Last name"
                                                        // isValid={touched.lastName && !errors.lastName}
                                                        isInvalid={!!errors.lastName && touched.lastName}
                                                    />
                                                       <Form.Control.Feedback type="invalid">
                                                        {errors.lastName}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col md={6} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Date of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="birthDate"
                                                        value={values.birthDate}
                                                        onChange={handleChange}
                                                        placeholder="00/00/0000"
                                                        // isValid={touched.birthDate && !errors.birthDate}
                                                        isInvalid={!!errors.birthDate && touched.birthDate}

                                                    />
                                                     <Form.Control.Feedback type="invalid">
                                                        {errors.birthDate}
                                                    </Form.Control.Feedback>
                                                </Col>
                                          
                                                <Col md={6} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Location</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="addressOne"
                                                        value={values.addressOne}
                                                        onChange={handleChange}
                                                        placeholder="Address"
                                                        // isValid={touched.addressOne && !errors.addressOne}
                                                        isInvalid={!!errors.addressOne && touched.addressOne}
                                                    />
                                                     <Form.Control.Feedback type="invalid">
                                                        {errors.addressOne}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className={classes.box}>
                                            <h3 className={"font-20 text-orange mb-3"}>Account Information</h3>
                                            <Row>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter Email"
                                                        // isValid={touched.email && !errors.email}
                                                        isInvalid={!!errors.email && touched.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Username</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="userName"
                                                        value={values.useName}
                                                        onChange={handleChange}
                                                        placeholder="Enter Username"
                                                        isValid={touched.userName && !errors.userName}

                                                    />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Temporary Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        placeholder="*******"
                                                        isValid={touched.password && !errors.password}

                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={"text-center pt-5"}>
                                    <Button type={"submit"}>Submit</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
            </Modal>
     
        </>
    )
}

export default AddSubAdmin;