import {React, useState} from "react";
import {Table, Form, Dropdown, Button, Row, Col} from "react-bootstrap";
import  classes from "./index.module.scss";
import cardimg from "Images/userImg.png";
import AddNewCard from "../../../Components/AddNewCard";


const AllTabData = () => {
    const alltabdata = [
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: true,
            source: "Google",
            posted: '11/20/2021'
        },
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: true,
            source: "Google",
            posted: '11/20/2021'
        },
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: true,
            source: "Google",
            posted: '11/20/2021'
        },
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: false,
            source: "Google",
            posted: '11/20/2021'
        },
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: true,
            source: "Google",
            posted: '11/20/2021'
        },
        {
            name: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            imageUrl: cardimg,
            status: false,
            source: "Google",
            posted: '11/20/2021'
        },
    ]

    const [modalShow, setModalShow] = useState(false);


    return(
        <>
            <div className={classes.tableFilter}>
                <Form>
                    <Row>
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fal fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                    <Form.Control type="search" placeholder="Search Users by Name, Email or Date" />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col md={4} className={"d-md-flex justify-content-end"}>
                            <Button onClick={() => setModalShow(true)}>
                                Add New
                            </Button>
                            <AddNewCard
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </Col>
                    </Row>


                </Form>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>
                        <Form.Check type="checkbox" />
                    </th>
                    <th>Name</th>
                    <th>date posted</th>
                    <th>source</th>
                    <th>status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {alltabdata.map((alltabdata) => (
                    <tr>
                        <td><Form.Check type="checkbox"/></td>
                        <td>
                            <div className={"d-flex"}>
                                <div className={classes.userImg}>
                                    <img src={alltabdata.imageUrl} alt={alltabdata.name} />
                                </div>
                                <div className={classes.description}>
                                    <h4 className={"font-16 mb-0"}>{alltabdata.name}</h4>
                                    <div className={"text-muted"}>{alltabdata.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {alltabdata.posted}
                        </td>
                        <td>{alltabdata.source}</td>
                        <td>
                            {alltabdata.status
                                ? <span class="text-success">Active</span>
                                : <span class="text-danger">InActive</span>
                            }
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <i className={"far fa-ellipsis-v fa-fw"}></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/">
                                        <i className={"far fa-pen bg-success text-white"}></i>
                                        Update Card
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/">
                                        <i className={"fal fa-trash bg-danger text-white"}></i>
                                        Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/">
                                        <i className={"fal fa-ban bg-dark text-white"}></i>
                                        View Participants
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}

export default AllTabData;