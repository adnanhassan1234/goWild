import {
  React,
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import {ENDPOINT, GOOGLE_KEY} from "config/constants";
import AuthService from "services/auth.service";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RouteMap from "./RouteMap";
import axios from "axios";

const CreateRoute = () => {
  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);
  const [inputFields, setInputFields] = useState([]);

  const [formArray, setFormArray] = useState([{}]);
  const [formData, setFormData] = useState({
    startLongtitude: "",
    startLattitude: "",
    endLongtitude: "",
    endLattitude: "",
    title: "",
    description: "",
    picture: "",
  });

  const [uploadFile, setUploadFile] = useState();
  const [showButton, setShowButton] = useState(false);

  const [startingPoint, setStartingPoint] = useState({
    lat: 0,
    lng: 0,
  });

  const [endingPoint, setEndingPoint] = useState({
    lat: 0,
    lng: 0,
  });

  // store id when user submit form
  const [id, setId] = useState();
  console.log("id", id);

  useEffect(() => {
  }, [startingPoint]);

  const handleChange = (event) => {
    let name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'startLongtitude':
        setStartingPoint({ ...startingPoint, lng: parseFloat(value) });
        break;
      case 'startLattitude':
        setStartingPoint({ ...startingPoint, lat: parseFloat(value) });
        break;
      case 'startLongtitude':
        setEndingPoint({ ...endingPoint, lng: parseFloat(value) });
        break;
      case 'startLongtitude':
        setEndingPoint({ ...endingPoint, lat: parseFloat(value) });
        break;
      default:
        setFormData((prevalue) => {
          return {
            ...prevalue, // Spread Operator
            [name]: value,
          };
        });
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    formData.start = {
      latitude: startingPoint.lat,
      longitude: startingPoint.lng,
    };
    formData.end = {
      latitude: endingPoint.lat,
      longitude: endingPoint.lng,
    };

    // formData.distance_miles =
    //   directionsData?.routes[0]?.legs[0]?.distance?.value ?? 0;
    // formData.distance_meters =
    //   directionsData?.routes[0]?.legs[0]?.duration?.value ?? 0;
    // formData.estimate_time =
    //   directionsData?.routes[0]?.legs[0]?.distance?.text ?? "-";
    // formData.startLocation =
    //   directionsData?.routes[0]?.legs[0]?.start_address ?? "-";
    // formData.endLocation =
    //   directionsData?.routes[0]?.legs[0]?.end_address ?? "-";

    formData.distance_miles = 0;
    formData.distance_meters = 0;
    formData.estimate_time = "-";
    formData.startLocation = "-";
    formData.endLocation = "-";

    console.log(`DUCK`, "historicalData", JSON.stringify(historicalData));
    const mergedState = Object.assign({}, formData, {
      history_ponts: historicalData,
    });
    console.log(`DUCK`, "mergeArray", JSON.stringify(mergedState));

    return AuthService.postMethod(
      ENDPOINT.admin_route.listing,
      true,
      mergedState
    )
      .then((res) => {

        let data = new FormData();
        data.append('file', uploadFile);
        setId(res.data.id);
        const url = (ENDPOINT.admin_route.update_pictures).replace(':id',res.data.id);
        AuthService.postMethod(
            url,
            true,
            data
        ).then((res) => {
          if (res.status === 200) {
            toast.success("Form data submitted successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setShowButton(true);
            navigate("/route-list");
            setFormData("");
          }
        }).catch((err) => {
          swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
        });
        console.log(res);
        // event.target.reset();
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  // add historical event

  const handleHistorical = (event, index) => {
    const name = event.target.name;
    const newRows = [...historicalData];
    // switch (name) {
    //   case 'longitude':
    //     newRows[index][event.target.name] = parseFloat(event.target.value);
    //     break;
    //   case 'latitude':
    //     newRows[index][event.target.name] = parseFloat(event.target.value);
    //     break;
    //   default:
    //     newRows[index][event.target.name] = event.target.value;
    // }
    newRows[index][event.target.name] = event.target.value;
    setHistoricalData(newRows);
  };

  const updateStartEndPosition = useCallback(
    (startPos, endPos) => {
      // console.log(
      //   `updateStartEndPosition: ${JSON.stringify(startPos)} ${JSON.stringify(
      //     endPos
      //   )}`
      // );
      setStartingPoint(startPos);
      setEndingPoint(endPos);
      /*if (directionsData == null) {
        const origin = "51,0";
        const destination = "51.5,-0.1";
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_KEY}`;
        const corsAnywhereUrl = `https://cors-proxy.htmldriven.com/?url=${url}`;

        axios.get(corsAnywhereUrl)
            .then(response => {
              console.log('Success')
       setDirectionsData(response.data);
              // Extract the distance value from the response
              console.log(response.data)
            })
            .catch(error => console.error(error));
      }*/
    },
    [startingPoint, endingPoint]
  );

  const handleAddRow = useCallback(
    (position = 0) => {
      //console.log(`handleAddRow: ${JSON.stringify(position)}`);
      setHistoricalData([
        ...historicalData,
        {
          latitude: position.lat ?? '',
          longitude: position.lng ?? '',
          title: "",
          subtitle: "",
          description: "",
          file: ""
        },
      ]);
    },
    [historicalData]
  );

  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
        URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...files, ...ImagesArray]);
    setUploadFile(e.target.files[0]);
    console.log("file", file);
  }

  function uploadSingleFileHistorical(e, index) {

    console.log(e.target.name)
    console.log(e.target.files)
    const newRows = [...historicalData];
    newRows[index][e.target.name] = e.target.files;
    //setHistoricalData(newRows);
    //setFiles([...files, ...ImagesArray]);
    //console.log("files", files);
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

  function deleteFileSingle(e) {
    setUploadFile('');
  }
  return (
    <Fragment>
      <PageTitle title="Normal Route" />
      <Form onSubmit={submitForm}>
        <section className={"section"}>
          <Row>
            <Col md={4}>
              <div className={"py-3"}>
                <p>
                  <i className={"fas fa-map-marker-alt text-dark mx-3"}></i>{" "}
                  Starting Point
                </p>
                <p>
                  <i className={"fas fa-map-marker-alt text-danger mx-3"}></i>{" "}
                  Finishing Point
                </p>
                <p>
                  <i className={"fas fa-map-marker-alt text-yellow mx-3"}></i>{" "}
                  Historical Event
                </p>
              </div>

              <Form.Group>
                <Form.Label>Starting Point</Form.Label>
                <Form.Control
                  type="text"
                  name="startLongtitude"
                  id="startLongtitude"
                  required
                  value={startingPoint?.lng}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Longtitude"
                />
                <Form.Control
                  type="text"
                  name="startLattitude"
                  id="startLattitude"
                  required
                  value={startingPoint?.lat}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Lattitude"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Point</Form.Label>
                <Form.Control
                  type="text"
                  name="endLongtitude"
                  id="endLongtitude"
                  required
                  value={endingPoint?.lng}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Longtitude"
                />
                <Form.Control
                  type="text"
                  id="endLattitude"
                  name="endLattitude"
                  required
                  value={endingPoint?.lat}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Lattitude"
                />
              </Form.Group>
              <Col md={12} className={"mb-3"}>
                <label className={"fileUpload v2"} htmlFor="upload-photo">
                  <Form.Control
                    type="file"
                    id={"upload-photo"}
                    value={formData.picture}
                    disabled={file.length === 1}
                    className=""
                    onChange={uploadSingleFile}
                  />
                  <span>Attach images of thumbnail</span>
                </label>
              </Col>
              <Col md={12} className={"mb-3"}>
                <div className="form-group previewBox">
                  {file.length > 0 &&
                      file.map((item, index) => {
                        return (
                            <div className={"preview"} key={item}>
                              <img src={item} alt="" />
                              <Button
                                  type="button"
                                  onClick={() => deleteFile(index)}
                              >
                                <i className={"fal fa-times"}></i>
                              </Button>
                            </div>
                        );
                      })}
                </div>
              </Col>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="My Race Title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Write something here ..."
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <div className={"img-box"}>
                <RouteMap
                  startingPoint={startingPoint}
                  endingPoint={endingPoint}
                  travelMode={"WALKING"}
                  handleAddRow={handleAddRow}
                  updateStartEndPosition={updateStartEndPosition}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={"d-md-flex item-center-between pt-5"}>
                <h3 className={"my-2 fw-bold"}>Historical</h3>
                <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                  <i className={"fal fa-plus"}></i> Add Historical
                </Button>
              </div>
              <hr />

              {historicalData.map((data, index) => (
                <div key={index}>
                  <Row>
                    <Col md={8}>
                      <Row>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Historical Event</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3 mb-md-5"}
                              name="longitude"
                              required
                              value={data.longitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "longitude")
                              }
                              placeholder="longitude"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="latitude"
                              required
                              value={data?.latitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "latitude")
                              }
                              placeholder="latitude"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="title"
                              required
                              value={data?.title}
                              onChange={(e) =>
                                handleHistorical(e, index, "title")
                              }
                              placeholder="Historical Item"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Sub-Title</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="subTitle"
                              required
                              value={data?.subTitle}
                              onChange={(e) =>
                                handleHistorical(e, index, "subTitle")
                              }
                              placeholder="Write something here..."
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              className={"mb-3"}
                              name="description"
                              required
                              value={data?.description}
                              onChange={(e) =>
                                handleHistorical(e, index, "description")
                              }
                              placeholder="Write something here..."
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col md={12} className={"mb-3"}>
                          <label
                            className={"fileUpload v2"}
                            htmlFor="upload-photo"
                          >
                            <Form.Control
                              type="file"
                              id={"upload-photo"}
                              disabled={files.length === 1}
                              className=""
                              onChange={(e) =>
                                  uploadSingleFileHistorical(e, index)
                              }
                            />
                            <span>Attach Images</span>
                          </label>
                        </Col>
                        <Col md={12} className={"mb-3"}>
                          <div className="form-group previewBox">
                            {files.length > 0 &&
                              files.map((item, index) => {
                                return (
                                  <div className={"preview"} key={item}>
                                    <img src={item} alt="" />
                                    <Button
                                      type="button"
                                      onClick={() => deleteFile(index)}
                                    >
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
                    <Col md={12} className={"mb-3 text-center"}>
                      <Form.Group>
                        {showButton ? (
                          <Button
                            type="submit"
                            className={"mt-3"}
                            style={{ width: "25%" }}
                          >
                            Save
                          </Button>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </section>
        <Form.Group>
          <Button type="submit" className={"w-100"}>
            Save
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default CreateRoute;
