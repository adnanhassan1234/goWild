import { React, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';

const PushNotificationPopup = (props) => {

    const [formData, setFormData] = useState({});
    const [addAdmin, setAddAdmin] = useState(false);

    const handleChange = (event) => {

        let value = event.target.value;
        let name = event.target.name;
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }


    const submitForm = async (event) => {
        event.preventDefault();
        try {
            // First API call
            const dataObj = {
                "title": formData.title,
                "message": formData.message,
                "email": formData.email,
            }
            const res = await AuthService.postMethod(`${ENDPOINT.treasure_chests.push_notification}`, true, dataObj);

            if (res.status === 201) {
                toast.success('Data submitted successfully', {
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
            console.log("res", res.data);

        } catch (err) {
            // swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
        }
    };

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>

                <Modal.Body style={{ padding: '14px 41px' }}>
                    <Button variant={"back"} className={"font-18 fw-bold"} onClick={props.onHide} >Push Notification</Button>

                    <Form onSubmit={submitForm}>
                        <div className="d-flex">
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Send to all participants" />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Send to all Participants" />
                            </Form.Group> */}
                        </div>
                        <Form.Group className="  mb-3" controlId="exampleForm.ControlInput1">
                            <div className="input-group mb-3">
                                <select className="form-select" name="actionRemove">
                                    <option value="value">Event Name</option>
                                    <option value="collect">COLLECT</option>
                                    <option value="smash">SMASH</option>
                                    <option value="cut">CUT</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Control type="text"
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Caption Here!" />
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Control type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="to: sender@gmail.com" />
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <textarea required
                                name="message"
                                value={formData.message}
                                onChange={handleChange} placeholder="Insert Treasure Hunt Instructions">

                            </textarea>
                        </Form.Group>
                        <div className={"text-center"}>
                            <Button type="submit" variant="success">Push</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PushNotificationPopup;