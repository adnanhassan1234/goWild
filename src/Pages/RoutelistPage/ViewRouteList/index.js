import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteMap from "../CreateRoute/RouteMap";

const ViewRouteList = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);

  if (props.viewItem === null) {
    return "";
  }
    props.viewItem["startValue"] = {
      lat: props.viewItem["start"].latitude,
      lng: props.viewItem["start"].longitude,
    }
    props.viewItem["endValue"] = {
        lat: props.viewItem["end"].latitude,
        lng: props.viewItem["end"].longitude,
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
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, , year].join("/");
  }

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Button variant="close" onClick={props.onHide}>
          <i className={"fal fa-times"}></i>{" "}
        </Button>
        <Modal.Body>
          <Formik
            initialValues={{
              id: "",
              createdDate: "",
              updatedDate: "",
              user_id: "",
              title: props.viewItem.title,
              picture: null,
              start: {
                latitude: props.viewItem["start"].latitude,
                longitude: props.viewItem["start"].longitude,
              },
              end: {
                latitude: props.viewItem["end"].latitude,
                longitude: props.viewItem["end"].longitude,
              },
              description: props.viewItem.description,
              role: "",
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
              <section className={"section"}>
                <Row>
                  <Col md={4}>
                    <div className={"py-3"}>
                      <p>
                        <i
                          className={"fas fa-map-marker-alt text-dark mx-3"}
                        ></i>{" "}
                        Starting Point
                      </p>
                      <p>
                        <i
                          className={"fas fa-map-marker-alt text-danger mx-3"}
                        ></i>{" "}
                        Finishing Point
                      </p>
                      <p>
                        <i
                          className={"fas fa-map-marker-alt text-yellow mx-3"}
                        ></i>{" "}
                        Historical Event
                      </p>
                    </div>
                    <Form>
                      <Form.Group>
                        <Form.Label className="mb-3">
                          <b>Starting Point</b>
                        </Form.Label>
                        <h6>Longitude</h6>
                        <p className={"mb-0"} />
                        {values["start"].longitude}
                      </Form.Group>
                      <Form.Group className="my-4">
                        <h6>Latitude</h6>
                        <p className={"mb-0"} />
                        {values["start"].latitude}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="mb-3">
                          <b>End Point</b>
                        </Form.Label>
                        <h6>Longitude</h6>
                        <p className={"mb-0"} />
                        {values["end"].longitude}
                      </Form.Group>
                      <Form.Group className="my-4">
                        <h6>Latitude</h6>
                        <p className={"mb-0"} />
                        {values["end"].latitude}
                      </Form.Group>
                      <Form.Group>
                        {/* </Form.Group>
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
                                            <Form.Group> */}
                        <Form.Group>
                          <Form.Label className="mb-3">
                            <b>Title</b>
                          </Form.Label>
                          <p className={"mb-0"} />
                          {values.title}
                        </Form.Group>
                        <Form.Label className="my-3">
                          <b>Description</b>
                        </Form.Label>
                        <p className={"mb-0"} />
                        {values.description}
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col md={8}>
                    <div className={"img-box"}>
                      <RouteMap
                        startingPoint={props.viewItem["startValue"]}
                        endingPoint={props.viewItem["endValue"]}
                        travelMode={"WALKING"}
                        preRenderMarkers={true}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                                    <Col md={12}>

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
                                </Row> */}
              </section>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewRouteList;
