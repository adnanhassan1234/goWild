import {React, useState} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import classes from "./index.module.scss";


const AddNewCard = (props) => {
    const [file, setFile] = useState([]);

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

    return(
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <div className={classes.box}>
                                    <Row>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Check
                                                inline
                                                type={"radio"}
                                                label={`Google`}
                                                id={`google`}
                                                name={"documentType"}
                                            />
                                            <Form.Check
                                                inline
                                                type={"radio"}
                                                label={`Internal`}
                                                id={`Internal`}
                                                name={"documentType"}
                                            />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Control type="text" placeholder="Click here" />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Control type="text" placeholder="URL link" />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <textarea>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                            </textarea>
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <label className={"fileUpload"} htmlFor="upload-photo">
                                                <Form.Control
                                                    type="file"
                                                    id={"upload-photo"}
                                                    disabled={file.length === 1}
                                                    className="form-control"
                                                    onChange={uploadSingleFile}
                                                />
                                            </label>

                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <div className="form-group preview">
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


                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddNewCard;