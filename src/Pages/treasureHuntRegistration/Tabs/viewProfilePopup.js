import { React, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import PhoneInput from 'react-phone-number-input';
import classes from "../../treasureHuntRegistration/index.module.scss";
import card1 from "../../../Images/card1.jpg";
import card2 from "../../../Images/card2.jpg";
import { ENDPOINT } from "../../../config/constants";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ViewProfilePopup = (props) => {

    // const [value, setValue] = useState();


    const [addAdmin, setAddAdmin] = useState(false);

    //const [value, setValue] = useState();
    const schema = object().shape({
        title: string().required(),
        firstName: string().required(),
        lastName: string().required(),
        // phoneNo: string().required(),
        // birthDate: string().required(),
    });
    //console.log(props.editItem)
    const handleSubmit = async (data) => {
        ENDPOINT.admin_user.edit_user.id = props.editItem;
        return await AuthService.patchMethod(ENDPOINT.admin_user.edit_user.url + ENDPOINT.admin_user.edit_user.id, true, data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }


    if (props.editItem === null) {
        return "";
    }



    const approveUser = async (id) => {
        const objData = {
            "status": "processing"
        }
        return AuthService.postMethod(`${ENDPOINT.treasure_chests.approve_reject}${id}`, true, objData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Status changed approved successfully!', {
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
                props.userRouteAllData()
                setTimeout(() => {
                    setAddAdmin(props.onHide);
                }, 1000);
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };

    const rejectUser = async (id) => {
        const objData = {
            "status": "disapprove"
        }
        // console.log("1233"+id);
        return AuthService.postMethod(`${ENDPOINT.treasure_chests.approve_reject}${id}`, true, objData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Status changed disapproved successfully!', {
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
                // if(res.status === 201){
                //     toast.success(res.data.message);
                //  }
                props.userRouteAllData()
                setTimeout(() => {
                    setAddAdmin(props.onHide);
                }, 1000);
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };

    return (
        <>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
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
                                <Row className="backGroundColor">
                                    <Col md={6}>
                                        <div className={classes.box}>
                                            <h3 className={"font-20 text-orange mb-3"}>Perosnal Data</h3>
                                            <Row>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Event Name</Form.Label>
                                                    <Form.Control className={"bottom-border"} type="text"
                                                        name="title"
                                                        disabled
                                                        value={props.editItem.treasure_chest.title}
                                                        onChange={handleChange}
                                                        placeholder="Event Name" />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>First Name</Form.Label>
                                                    <Form.Control className={"bottom-border"} type="text"
                                                        disabled
                                                        name="firstName"
                                                        value={props.editItem.user.firstName}
                                                        onChange={handleChange}
                                                        placeholder="First Name" />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                                    <Form.Control className={"bottom-border"} type="text"
                                                        disabled
                                                        name="lastName"
                                                        value={props.editItem.user.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Last name" />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Phone Number</Form.Label>
                                                    <PhoneInput
                                                        disabled
                                                        placeholder="Phone Number"
                                                        className={"bottom-border"}
                                                        defaultCountry="CA"
                                                        international
                                                        value={props.editItem.user.phoneNo}
                                                        countryCallingCodeEditable={false}
                                                        onChange={handleChange}
                                                    // value={value}
                                                    // onChange={setValue}

                                                    />
                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label
                                                        className={"text-orange mb-0"}>Gender</Form.Label>
                                                    <Form.Select disabled className={"bottom-border"}>
                                                        <option>{props.editItem.user.gender}</option>
                                                    </Form.Select>

                                                </Col>
                                                <Col md={12} className={"mb-3"}>
                                                    <Form.Label className={"text-orange mb-0"}>Date of Birth</Form.Label>
                                                    <Form.Control className={"bottom-border"} type="date" placeholder="00/00/0000"
                                                        disabled
                                                        value={props.editItem.user.birthDate}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className={`${classes.box} h-100`}>
                                            <div className={classes.imgBox}>
                                                {(props.editItem.user.frontImage) ? <img src={"https://api.gowild.appscorridor.com" + props.editItem.user.frontImage} width="100%" alt={"card1"} /> : <img src={card1} width="100%" alt={"img"} />}
                                            </div>
                                            <div className={classes.imgBox}>
                                                {(props.editItem.user.backImage) ? <img src={"https://api.gowild.appscorridor.com" + props.editItem.user.backImage} width="100%" alt={"card2"} /> : <img src={card2} width="100%" alt={"img"} />}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={"text-center pt-5"}>
                                    <Col md={6}>
                                        <Button variant="danger w-50" onClick={() => rejectUser(props.editItem.id)}>Reject</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="success w-50" onClick={() => approveUser(props.editItem.id)}>Approve</Button>
                                    </Col>
                                </Row>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewProfilePopup;