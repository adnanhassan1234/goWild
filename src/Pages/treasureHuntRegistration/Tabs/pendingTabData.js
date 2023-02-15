import { React, useState, useEffect, useContext } from "react";
import classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import { Form, Dropdown, Row, Col, Button, Table } from "react-bootstrap";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import ViewProfilePopup from "./viewProfilePopup";
import ReactPaginate from 'react-paginate';
import profile from "Images/Ellipse 768 (1).png";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PendingTabData = (props) => {
    /* Destructuring the props object. */
    const { content } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const [editItem, setEditItem] = useState(null);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // var itemsPerPage = 4;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % content.length;
        setItemOffset(newOffset);
    };

    const handleRowsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    };

    const approveUser = async (id) => {
        const objData = {
            "status": "processing"
        }
        // console.log("1233"+id);
        return AuthService.postMethod(`${ENDPOINT.treasure_chests.approve_reject}${id}`, true, objData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success('User status Changed Successfully! (Approved)', {
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
                //  setAddAdmin(props.onHide);
                //  props.content()
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
                    toast.success('User status Changed Successfully! (Disapproved)', {
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
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });


    };


    // chekbox select all
    const handleCheckboxChange = (content) => {
        if (selectedItems.includes(content)) {
            setSelectedItems(selectedItems.filter((i) => i !== content));
        } else {
            setSelectedItems([...selectedItems, content]);
        }
    };

    const handleSelectAll = () => {
        setSelectedItems(content);
        setIsChecked(!isChecked);
    }

    const handleDeselectAll = () => {
        setSelectedItems([]);
        setIsChecked(!isChecked);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentItems(
            content.filter(
                (content) =>
                    (content.user.firstName.trim() + " " + content.user.lastName.trim()).toLowerCase().includes(event.target.value.toLowerCase().trim()) ||
                    content.user.email.toLowerCase().includes(event.target.value.toLowerCase().trim())
            )
        );
        if (event.target.value.trim() === '') {
            props.userRouteAllData();
        }
    };

    return (
        <>
            <div className={classes.tableFilter}>
                <Form>
                    <Row>
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fas fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                <Form.Control type="search" placeholder="Search Users by Name, Email or Date" value={searchTerm} onChange={handleSearch}  />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>
                            {isChecked ? <Form.Check type="checkbox" onChange={handleSelectAll} /> : <Form.Check type="checkbox" onClick={handleDeselectAll} />}
                        </th>
                        <th> &nbsp;&nbsp;&nbsp;Name</th>
                        <th>Event Name</th>
                        <th>Online Status</th>
                        <th>Username</th>
                        <th>Application Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((content) => (
                            <tr>
                                <td><Form.Check type="checkbox" value={content}
                                    onChange={() => handleCheckboxChange(content)}
                                    checked={selectedItems.includes(content)} />
                                </td>
                                <td>
                                    <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                    {(content.user.picture)? <img src={"https://api.gowild.appscorridor.com" + content.user.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                    </div>
                                        <div className={classes.description}>
                                            <h4 className={"font-16 mb-0"}>{content.user.firstName + " " + content.user.lastName}</h4>
                                            <div className={"text-muted text-lowercase"}>{content.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {content.treasure_chest.title}
                                </td>
                                <td>
                                    {content.treasure_chest.status === "pending"
                                        ? <span class={`${classes.tag} ${classes.inactive}`}>Inctive</span>
                                        : <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                    }
                                </td>
                                <td>
                                    {content.user.firstName}
                                </td>
                                <td>
                                    {content.status === "processing" ? <span class="text-success text-uppercase"><b>Approved</b></span>
                                        : content.status === 'pending' ? <span class="text-warning  text-uppercase"><b>Pending</b></span>
                                            : <span class="text-danger text-uppercase" ><b>Disapprove</b></span>
                                    }
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <i className={"far fa-ellipsis-v fa-fw"}></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {content.status === 'processing'
                                                ? <Dropdown.Item href="#/" onClick={() => rejectUser(content.id)}>
                                                    <i className={"fal fa-ban bg-danger text-white"}></i>
                                                    Disapprove
                                                </Dropdown.Item>
                                                : <Dropdown.Item href="#/" onClick={() => approveUser(content.id)}>
                                                    <i className={"fal fa-check bg-success text-white"}></i>
                                                    Approve
                                                </Dropdown.Item>
                                            }
                                            <Dropdown.Item href="#/" onClick={
                                                () => {
                                                    setModalShowView(true)
                                                    setEditItem(content)
                                                }
                                            }>
                                                <i className={"fal fa-user bg-dark text-white"}></i>
                                                View Profile
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <div className="result_pagination">
                <span> Rows per page: &nbsp; </span>
                <select onChange={handleRowsPerPageChange} value={itemsPerPage}>
                    {/* <option>{currentItems.length}</option> */}
                    {/* {currentItems.length === 4 ? null  :<option value={4}>4</option>} */}
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                </select> <i className="fa fa-sort-desc" aria-hidden="true"></i>

                {/* <span className="mx-4"> {currentItems.length} - {content.length} of {content.length} </span> */}
                <span className="mx-5"> {pageCount} - {currentItems.length}  of {content.length} </span>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    rowsPerPage={itemsPerPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"

                />
            </div>
  

            <AddSubAdmin
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ViewProfilePopup
                subAdminAllData={props.subAdminAllData}
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}
            />
        </>
    )
}

export default PendingTabData;