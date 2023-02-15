import {React, useState} from "react";
import classes from  "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import card1 from "../../Images/card1.jpg";
import card2 from "../../Images/card2.jpg";
import PushNotificationPopup from "./pushNotificationPopup";

const  Approved =(props)=>{
    const [value, setValue] = useState();
    const [modalShow, setModalShow] = useState(false);

    return(
        <>
            <PageTitle title={"Thrill Seekers Attraction in Houston"} />
            <section className={"Section"}>
                <Form>
                    <Row>
                        <Col md={6}>
                            <div className={`${classes.box} border-0`}>
                                <h3 className={"font-20 text-orange mb-3"}>Perosnal Data</h3>
                                <Row>
                                    <Col md={12} className={"mb-3"}>
                                        <Form.Label className={"text-orange mb-0"}>First Name</Form.Label>
                                        <Form.Control className={"bottom-border"} type="text" placeholder="First Name" />
                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                        <Form.Control className={"bottom-border"} type="text" placeholder="Last name" />
                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <Form.Label className={"text-orange mb-0"}>Phone Number</Form.Label>
                                        <PhoneInput
                                            placeholder="Phone Number"
                                            className={"bottom-border"}
                                            defaultCountry="CA"
                                            international
                                            countryCallingCodeEditable={false}
                                            value={value}
                                            onChange={setValue}/>
                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <Form.Label className={"text-orange mb-0"}>Gender</Form.Label>
                                        <Form.Select className={"bottom-border"}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Form.Select>

                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <Form.Label className={"text-orange mb-0"}>Date of Birth</Form.Label>
                                        <Form.Control className={"bottom-border"} type="date" placeholder="00/00/0000" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className={`${classes.box} border-0`}>
                                <h6 className={"text-orange"}>Submitted ID Card</h6>
                                <div className={`${classes.imgBox} m-0`}>
                                    <img src={card1} alt={"card1"} />
                                </div>
                                <div className={`${classes.imgBox} m-0`}>
                                    <img src={card2} alt={"card2"} />
                                </div>
                                <h6 className={"text-orange pt-5"}>Registration Number</h6>
                                <div>134203- <span className={"text-warning"}>Pending</span></div>
                            </div>
                        </Col>
                    </Row>
                    <div className={"pt-5 d-flex justify-content-between"}>
                        <Button variant="gary" className={"m-3"}>Remove From Event</Button>
                        <Button variant="success" className={"m-3"}  onClick={() => setModalShow(true)}>Mark as Winner</Button>
                    </div>
                </Form>
            </section>
            <PushNotificationPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Approved;