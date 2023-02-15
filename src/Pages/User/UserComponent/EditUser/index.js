import React, {useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import classes from "../index.module.scss";
import AuthService from "../../../../services/auth.service";
import {ENDPOINT} from "../../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';

const EditUser = (props) => {

    const schema = object().shape({
        firstName: string().required(),
        lastName: string().required(),
        email: string().required(),
        username: string().required(),
        location: string().required(),
        phoneNo: string().required(),
        birthDate: string().required(),
        password:  string().required(),
    });
    //console.log(props.editItem)
    const handleSubmit = async  (data) => {
        ENDPOINT.admin_user.edit_user.id = props.editItem;
        return await AuthService.patchMethod(ENDPOINT.admin_user.edit_user.url+ENDPOINT.admin_user.edit_user.id, true,data)
            .then((res) => {
                //setContent(res.data);
                //setIsLoader(true);
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }

    if(props.editItem===null){
        return "";
    }
    return(
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
                            firstName: props.editItem.firstName,
                            lastName: props.editItem.lastName,
                            email: props.editItem.email,
                            username: props.editItem.username,
                            location: props.editItem.location,
                            birthDate: props.editItem.birthDate,
                            phoneNo: props.editItem.phoneNo,
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
                                <Row>
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
                                                        isValid={touched.firstName && !errors.firstName}
                                                    />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="lastName"
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Enter Last name"
                                                        isValid={touched.lastName && !errors.lastName}
                                                    />
                                                </Col>
                                                <Col md={6} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Date of Birth</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="birthDate"
                                                        value={values.birthDate}
                                                        onChange={handleChange}
                                                        placeholder="00/00/0000"
                                                        isValid={touched.birthDate && !errors.birthDate}

                                                    />
                                                </Col>
                                                <Col md={6} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phoneNo"
                                                        value={values.phoneNo}
                                                        onChange={handleChange}
                                                        placeholder="+ 123 456 789"
                                                        isValid={touched.phoneNo && !errors.phoneNo}

                                                    />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Location</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="location"
                                                        value={values.location}
                                                        onChange={handleChange}
                                                        placeholder="Address 1"
                                                        isValid={touched.location && !errors.location}

                                                    />
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
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter Email"
                                                        isValid={touched.email && !errors.email}

                                                    />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>User Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="username"
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        placeholder="Enter username"
                                                        isValid={touched.username && !errors.username}
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

export default EditUser;