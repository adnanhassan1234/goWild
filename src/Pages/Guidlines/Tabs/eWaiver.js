import classes from "../index.module.scss";
import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EWavier = () => {


    const [formData, setFormData] = useState({});
    const [faqData, setFaqData] = useState({});
    const [termsData, setTermsData] = useState({});
    const [isLoader, setIsLoader] = useState(false);




    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        // const value = event.target.value.replace(/\D/g, "");
        // const value = event.target.value.replace(/(0|)\D/g, "");
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator
                [name]: value
            }
        })
    }


    const guidlinessWaiverData = async () => {
        try {
            // First API call

            const res = await AuthService.getMethod(`${ENDPOINT.admin_guidelines.eWaiver_listing}`, true);
              setFormData(res.data?.data)
            // console.log("res", res.data.data);
            // 2nd API call
            const res2 = await AuthService.getMethod(`${ENDPOINT.admin_guidelines.faq_listing}`, true);
            setFaqData(res2.data?.data)
            // console.log("res2", res2.data.data);

            // // 3rd API call
            const res3 = await AuthService.getMethod(`${ENDPOINT.admin_guidelines.termsAndConditions_listing}`, true);
            setTermsData(res3.data?.data)
            setIsLoader(true);
            // console.log("res3", res3.data.data);

        } catch (err) {
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
        }
    };



    const submitEventForm = async (event) => {
        event.preventDefault();
        const dataObj = {
            "type": "eWaiver",
            "description": formData?.description,
        }
        return AuthService.postMethod(ENDPOINT.admin_guidelines.terms_conditions, true, dataObj)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
                console.log(res);
                guidlinessWaiverData();
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


    useEffect(() => {
        guidlinessWaiverData();
        // faqAllData();

    }, []);

    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }



    const date =  formData?.updatedDate ? new Date(formData?.updatedDate) : null;

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);


        if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <div className={classes.editSection}>
                        <Form >
                            <Form.Group className={`${classes.formGroup} mb-3`}>
                                <textarea
                                    name="description"
                                    value={formData?.description}
                                    onChange={handleChange}
                                >
                                </textarea>
                            </Form.Group>
                            <Form.Group>
                                <Button variant={"dark"} onClick={submitEventForm}> Save </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
                <Col md={4}>
                    <div className={classes.logBox}>
                    {/* {formData.updatedDate} */}
                        <h4>  {formattedDate} </h4>
                        <div className={"text-muted font-12"}>Update Logs</div>
                        <ul className={classes.logList}>
                            <li>
                                <div className={classes.box}>
                                    <time className={"d-block"}>
                                        {(formatDate(termsData?.updatedDate))}
                                    </time>
                                    <div>Term &amp; Conditions - Updated!</div>
                                </div>
                            </li>
                            <li>
                                <div className={classes.box}>
                                    <time className="d-block">
                                        {/* {(formatDate(faqData.updatedDate))} */}
                                        {(formatDate(termsData?.updatedDate))}
                                    </time>
                                    <div>FAQ</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default EWavier;