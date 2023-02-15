import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRouteList = (props) => {


    const navigate = useNavigate();

    const [file, setFile] = useState([]);
    const [values, setvalues] = useState({})



    const schema = object().shape({
    title: string().required(),
    description: string().required(),
    latitude: string().required(),
    longitude: string().required(),
    // date: string().required(),
    // time: string().required(),
    // number: string().required(),
    });
    console.log(props.editItem)
    // console.log({...props})


    const handleSubmit = async (data) => {
    ENDPOINT.route.edit_user.id = props.editItem.id;
    return await AuthService.patchMethod(ENDPOINT.route.edit_user.url+ENDPOINT.route.edit_user.id, true, data)
    .then((res) => {
        if (res.status === 200) {
            toast.success('Route Updated Successfully', {
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
        //setContent(res.data);
        //setIsLoader(true);
        console.log(res);
    })
    .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    });

    }

    if (props.editItem === null) {
    return "";
    }


    function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
    URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    console.log("file", file);
    }

    function upload(e) {
    e.preventDefault();
    console.log(file);
    }

    function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
    }



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

    return [month, day, , year].join('/');
    }
   

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

                            "title": props.editItem.title,
                            "description": props.editItem.description,
                            "start": {
                                "latitude": props.editItem['start'].latitude,
                                "longitude":props.editItem['start'].longitude,
                            },
                            "end": {
                                "latitude": props.editItem['end'].latitude,
                                "longitude": props.editItem['end'].longitude,
                            },
                            "distance_miles": 0,
                            "distance_meters": 0,
                            "estimate_time": "2h 14m"
                        }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
            }) =>   (
                <section className={"section"}>
                
                <Row>
                    <Col md={4}>
                        <div className={"py-3"}>
                            <p><i className={"fas fa-map-marker-alt text-dark mx-3"}></i> Starting Point</p>
                            <p><i className={"fas fa-map-marker-alt text-danger mx-3"}></i> Finishing Point</p>
                            <p><i className={"fas fa-map-marker-alt text-yellow mx-3"}></i> Historical Event</p>
                        </div>
                        <Form noValidate onSubmit={handleSubmit}
                        
                        >
                            <Form.Group>
                                <Form.Label>Starting Point</Form.Label>
                                <Form.Control type="text"
                                    name="longitude"
                                    value={values.start.longitude}
                                    onChange={handleChange}
                                    isValid={touched.longitude && !errors.longitude}
                                    className={"mb-3"} placeholder="longitude" />
                                <Form.Control type="text"
                                    name="latitude"
                                    value={values.start.latitude}
                                    onChange={handleChange}
                                    isValid={touched.latitude && !errors.latitude}
                                    className={"mb-3"} placeholder="latitude" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Point</Form.Label>
                                <Form.Control type="text"
                                    name="longitude"
                                    value={values.end.longitude}
                                    onChange={handleChange}
                                    isValid={touched.longitude && !errors.longitude}
                                    className={"mb-3"} placeholder="longitude" />
                                <Form.Control type="text"
                                    name="latitude"
                                    value={values.end.latitude}
                                    onChange={handleChange}
                                    isValid={touched.latitude && !errors.latitude}
                                    className={"mb-3"} placeholder="latitude" />
                            </Form.Group>
                            <Col md={12} className={"mb-3"}>
                                        <label className={"fileUpload v2"} htmlFor="upload-photo">
                                            <Form.Control
                                                type="file"
                                                id={"upload-photo"}
                                                disabled={file.length === 1}
                                                className=""
                                                onChange={uploadSingleFile}
                                            />
                                            <span>Attach Images</span>
                                        </label>

                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <div className="form-group previewBox">
                                            {file.length > 0 &&
                                                file.map((item, index) => {
                                                    return (
                                                        <div className={"preview"} key={item}>
                                                            <img src={item} alt="" />
                                                            <Button type="button" onClick={() => deleteFile(index)}>
                                                                <i className={"fal fa-times"}></i>
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </Col>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isValid={touched.title && !errors.title}
                                    className={"mb-3"} placeholder="My Race Title" />
                                <Form.Control as="textarea" type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    isValid={touched.description && !errors.description}
                                    className={"mb-3"} placeholder="Write something here ..." />
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" className={"w-100"}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={8}>
                        <div className={"img-box"}>
                            <img src={map1} alt={"img"} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className={"d-md-flex item-center-between pt-5"}>
                            <h3 className={"my-2 fw-bold"}>Historical</h3>
                            <Button><i className={"fal fa-plus"}></i> Add Historical</Button>
                        </div>
                        <hr />
                        <Row>
                            <Col md={8}>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Historical Event</Form.Label>
                                                <Form.Control type="text" className={"mb-3 mb-md-5"} placeholder="Longtitude" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Lattitude" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Historical Item" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Sub-Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Write something here..." />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" className={"mb-3"} placeholder="Write something here ..." />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Form>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <Col md={12} className={"mb-3"}>
                                        <label className={"fileUpload v2"} htmlFor="upload-photo">
                                            <Form.Control
                                                type="file"
                                                id={"upload-photo"}
                                                disabled={file.length === 1}
                                                className=""
                                                onChange={uploadSingleFile}
                                            />
                                            <span>Attach Images</span>
                                        </label>

                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <div className="form-group previewBox">
                                            {file.length > 0 &&
                                                file.map((item, index) => {
                                                    return (
                                                        <div className={"preview"} key={item}>
                                                            <img src={item} alt="" />
                                                            <Button type="button" onClick={() => deleteFile(index)}>
                                                                <i className={"fal fa-times"}></i>
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </Col>
                                    <Col md={12} className={"mb-3 text-center"}>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-block w-50"
                                            onClick={upload}
                                        >
                                            Upload
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

             
            </section>
            )}
        </Formik>

    </Modal.Body>
</Modal>
</>
)
}

export default EditRouteList;