import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import classes from "../index.module.scss";
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import moment from 'moment';
import img2 from "Images/chestcpAsset .png";

const EditTreasure = (props) => {

    const [addAdmin, setAddAdmin] = useState(false);
    const [formData, setFormData] = useState({});
    const [uploadFile, setUploadFile] = useState({});
    const [uploadFiles, setUploadFiles] = useState({});

    const [fields, setFields] = useState([{ sponsor: '', file: null, imgLink: '' }]);
    const [show, setShow] = useState(false);


    const navigate = useNavigate();

    const [file, setFile] = useState([]);

    const schema = object().shape({
    title: string().required(),
    description: string().required(),
    latitude: string().required(),
    longitude: string().required(),
    updatedDate: string().required(),
    createdDate: string().required(),
    eventTime: string().required(),
    no_of_participants: string().required(),
    });
    console.log(props.editItem)


    const handleSubmit = async (data) => {
    // console.log("handleSubmit ~ data", data)

    ENDPOINT.treasure_chests.edit_user.id = props.editItem.id;
    return await AuthService.patchMethod(ENDPOINT.treasure_chests.edit_user.url+ENDPOINT.treasure_chests.edit_user.id, true, data)
    .then((res) => {
        setTimeout(() => {
            setAddAdmin(props.onHide);
            props.treasureChestsListData()
            // props.subAdminAllData();
          }, 1000);
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




    const handleAddField = () => {
        setFields([...fields, { sponsor: '', file: null, imgLink: '' }]);
        setShow(true);
    };

    const handleRemoveField = index => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleChanges = (index, event) => {

        let value = event.target.value;
        let name = event.target.name;
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })


        setUploadFiles({ uploadFiles: event.target.files[0] })
        console.log("uploadFiles", event.target.files[0])

        const newFields = [...fields];
        if (event.target.name === 'file') {
            newFields[index][event.target.name] = URL.createObjectURL(event.target.files[0]);
        } else {
            newFields[index][event.target.name] = event.target.value;
        }
        setFields(newFields);
    };




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
                "createdDate": props.editItem.createdDate,
                "updatedDate": props.editItem.updatedDate,
                title: props.editItem.title,
                description: props.editItem.description,
                "location": {
                    "latitude": props.editItem.location.latitude,
                    "longitude": props.editItem.location.longitude,
                },
                latitude: props.editItem.location.latitude,
                longitude: props.editItem.location.longitude,
                eventDate: props.editItem.eventDate,
                "eventTime": props.editItem.eventTime,
                "status": "pending",
                "no_of_participants": props.editItem.no_of_participants,
                "a_r": "augmented reality",
                "winnerId": "uuid",
                "picture": props.editItem.picture,
                "a_r": "augmented reality",
                "sponsor": {
                        "img": props.editItem.img,
                        "link":props.editItem.img,
                    },            
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
                <section className={"section treasure_chests"}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>

                                <Form.Group>
                                    <Form.Label><b>Title</b></Form.Label>
                                    <Form.Control type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        isValid={touched.title && !errors.title}
                                        className={"mb-3"} placeholder="First On The List" />
                                    <Form.Label><b>Description</b></Form.Label>
                                    <Form.Control as="textarea" type="text"
                                        name="description"

                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        className={"mb-3"} placeholder="Write something here ..." />
                                    <Form.Label><b>Treasure Location</b></Form.Label>
                                    <Form.Control type="text"
                                        name="latitude"
                                        value={values.location.latitude}
                                        // onChange={handleChange}
                                        // isValid={touched.latitude && !errors.latitude}
                                        onChange={(e) => {
                                            handleChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    name: "location.latitude",
                                                    value: e.target.value,
                                                },
                                            });
                                        }}
                                        className={"mb-3"} placeholder="65.5234°" />
                                    <Form.Control type="text"
                                        name="longitude"
                                        value={values.location.longitude}
                                        // onChange={handleChange}
                                        // isValid={touched.longitude && !errors.longitude}
                                            onChange={(e) => {
                                                handleChange({
                                                    ...e,
                                                    target: {
                                                        ...e.target,
                                                        name: "location.longitude",
                                                        value: e.target.value,
                                                    },
                                                });
                                            }}
                                        className={"mb-3"} placeholder="1.12378°" />
                                </Form.Group>

                            </Col>
                            <Col md={8}>
                                <div className={"img-box"}>
                                    <img src={map1} alt={"img"} />
                                </div>
                            </Col>

                            <Col md={12}>
                                <div className={"pt-5"}>
                                </div>
                         
                                <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label className="mt-1"><b>Sponsors</b></Form.Label>
                                                        <Form.Group className="mt-2">

                                                            <div>
                                                                {fields.map((values, index) => (
                                                                    <div key={index}>
                                                                        <div className="d-flex">
                                                                            { <img src={"https://api.gowild.appscorridor.com" + props.editItem.sponsor[0].img} width="20%" alt="Preview" />}
                                                                            <input
                                                                                type="text"
                                                                                name="link"
                                                                                required
                                                                                value={props.editItem.sponsor[0].link}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com"
                                                                                onChange={event => handleChanges(index, event)}
                                                                                style={{ marginBottom: '0px !important' }}
                                                                            />

                                                                        </div>
                                                                        <div className="d-flex my-2">
                                                                            <p className="sponser">
                                                                                <button>add <br /> image  <input
                                                                                    type="file"
                                                                                    className="fileCss"
                                                                                    name="file"
                                                                                    onChange={event => handleChanges(index, event)}
                                                                                // style={{ display: 'none' }} ref={fileInputRef}
                                                                                /></button>

                                                                            </p>
                                                                            <input
                                                                                type="text"
                                                                                name="file"
                                                                                required
                                                                                value={values.file}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗Link" style={{ marginBottom: '0px !important' }}
                                                                                onChange={event => handleChanges(index, event)}
                                                                            />
                                                                            {show ? <button className="deleteButton" onClick={() => handleRemoveField(index)}>X</button> : ""}
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="mb-0 float-right addMore" onClick={handleAddField}>Add more</p>

                                                        </Form.Group>

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {/* <input type="text" value={props.editItem.sponsor[0].link} /> */}
                                        {/* <img src={"https://api.gowild.appscorridor.com" + props.editItem.sponsor[0].img} width="20%" alt={"img"} /> */}
                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group style={{ width: "90%" }}>
                                                        <Form.Label><b>Event Date</b></Form.Label>
                                                        <Form.Group>
                                                        <Form.Control type="date"
                                                            name="eventDate"
                                                            value={values.eventDate}
                                                            // value={(formatDate(values.eventDate))}
                                                            onChange={handleChange}
                                                            isValid={touched.eventDate && !errors.eventDate}
                                                            className={"mb-3"} />
                                                        </Form.Group>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
                                                        <Form.Label><b>Time</b></Form.Label>
                                                        <Form.Control type="time"
                                                        name="eventTime"
                                                        value={values.eventTime}
                                                        onChange={handleChange}
                                                        isValid={touched.eventTime && !errors.eventTime}
                                                        className={"mb-3"}  />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
                                                        <Form.Label><b>Number of participants</b></Form.Label>
                                                        <Form.Control type="number"
                                                        name="no_of_participants"
                                                        value={values.no_of_participants}
                                                        onChange={handleChange}
                                                        min="1"
                                                        isValid={touched.no_of_participants && !errors.no_of_participants}
                                                        className={"mb-3"} placeholder="200" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Label className="d-flex "><b>Upload Augmented Reality</b></Form.Label>
                                                    <label className={"treasureChest_img"} htmlFor="upload">
                                                        <img src={img2} width="85%" alt="" />
                                                    </label>
                                                    <Form.Label className="d-flex mt-4 mb-0 "><b>Upload Thumbnail</b></Form.Label>
                                                    <label className={"fileUpload mx-5 v2 v3 opacity-0 mb-0 "}  htmlFor="upload-photo">
                                                    <Form.Control
                                                        type="file"
                                                        name="picture"
                                                        // className="my-5"
                                                        id={"upload-photo"}
                                                        disabled={file.length === 1}
                                                        onChange={uploadSingleFile}
                                                    />
                                                    
                                                        {/* <span>Attach images of thumbnail</span> */}
                                                    </label>
                                                    <img src={"https://api.gowild.appscorridor.com" +values.picture} width="60%" alt={"img"} />
                                                    {/* preview image */}
                                                    {/* <img src={"https://api.gowild.appscorridor.com" + values.picture} width="70%" alt={"img"} /> */}
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
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} className="d-flex justify-content-center">
                                    <Form.Group className="text-center" style={{ width: "58%" }}>
                                    <Button type="submit" className={"w-50 my-4 m-auto"}>Update</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                    </Form>





                </section>
            )}
        </Formik>

    </Modal.Body>
</Modal>
</>
)
}

export default EditTreasure;