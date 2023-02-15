import { React, useState, useEffect, useContext } from "react";
import { Form, Dropdown, Button, Row, Col, Table } from "react-bootstrap";
import classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import Tables from "../../../Components/Table";
import ViewProfilePopup from "../Tabs/viewProfilePopup";
import { Link } from "react-router-dom";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import profile from "Images/Ellipse 768.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PushNotificationPopup from "../pushNotificationPopup";


const AllTabData = (props) => {


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
        return  AuthService.postMethod(`${ENDPOINT.treasure_chests.approve_reject}${id}`, true , objData)
            .then((res) => {
                if(res.status === 201){
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
                // swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };

        
    const rejectUser = async (id) => {
        const objData = {
            "status": "disapprove"
          }
        // console.log("1233"+id);
        return  AuthService.postMethod(`${ENDPOINT.treasure_chests.approve_reject}${id}`, true , objData)
            .then((res) => {
                if(res.status === 201){
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

     // download csv file
     const handleDownload = async () => {
        try {
            const res = await AuthService.getMethod(`${ENDPOINT.treasure_chests.csv_file}`, true);
            const blob = new Blob([res.data], { type: "text/csv" });
            const fileUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = fileUrl;
            a.download = "data.csv";
            a.click();
            console.log("file: index.js:31 ~ handleDownload ~ res", res)
            if (res.status === 200) {
                toast.success('csv file downloaded successfully!', {
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

        } catch (err) {
            swal("Error", `${AuthService.errorMessageHandlerDate(err)}`, "error");
        }
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
                        <Col md={7}>
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
                        <Col md={5} className={"d-flex justify-content-between"}>
                            <Button variant={'transparent text-dark'} onClick={handleDownload}>
                                <span className={'d-inline-block mx-2 mr-5'}>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2344 5.27344L11.1328 4.10156L9.96094 0H1.17188C0.524648 0 0 0.524648 0 1.17188V18.8281C0 19.4754 0.524648 20 1.17188 20H14.0625C14.7097 20 15.2344 19.4754 15.2344 18.8281V5.27344Z" fill="#59C36A"/>
                                    <path d="M15.2343 5.27344V18.8281C15.2343 19.4754 14.7097 20 14.0625 20H7.71094V0H9.9609L11.1328 4.10156L15.2343 5.27344Z" fill="#00A66C"/>
                                    <path d="M15.2344 5.27344H11.1328C10.4883 5.27344 9.96094 4.74609 9.96094 4.10156V0C10.1133 0 10.2656 0.0585938 10.3711 0.17582L15.0586 4.86332C15.1758 4.96875 15.2344 5.12109 15.2344 5.27344Z" fill="#A0DEB0"/>
                                    <path d="M4.23115 13.07C3.70449 13.07 3.26949 12.895 2.92615 12.545C2.58282 12.195 2.41115 11.7633 2.41115 11.25C2.41115 10.7333 2.58282 10.3017 2.92615 9.955C3.26949 9.605 3.70449 9.43 4.23115 9.43C4.54782 9.43 4.83949 9.505 5.10615 9.655C5.37615 9.80167 5.58615 10.0017 5.73615 10.255L5.14115 10.6C5.05449 10.4433 4.93115 10.3217 4.77115 10.235C4.61115 10.145 4.43115 10.1 4.23115 10.1C3.89115 10.1 3.61615 10.2067 3.40615 10.42C3.19949 10.6333 3.09615 10.91 3.09615 11.25C3.09615 11.5867 3.19949 11.8617 3.40615 12.075C3.61615 12.2883 3.89115 12.395 4.23115 12.395C4.43115 12.395 4.61115 12.3517 4.77115 12.265C4.93449 12.175 5.05782 12.0533 5.14115 11.9L5.73615 12.245C5.58615 12.4983 5.37782 12.7 5.11115 12.85C4.84449 12.9967 4.55115 13.07 4.23115 13.07ZM7.01037 13L5.83537 9.5H6.58537L7.44037 12.19L8.29037 9.5H9.04537L7.86537 13H7.01037ZM10.48 13.07C10.1334 13.07 9.84169 12.9933 9.60502 12.84C9.36835 12.6833 9.20169 12.4717 9.10502 12.205L9.69502 11.86C9.83169 12.2167 10.1 12.395 10.5 12.395C10.6934 12.395 10.835 12.36 10.925 12.29C11.015 12.22 11.06 12.1317 11.06 12.025C11.06 11.9017 11.005 11.8067 10.895 11.74C10.785 11.67 10.5884 11.595 10.305 11.515C10.1484 11.4683 10.015 11.4217 9.90502 11.375C9.79835 11.3283 9.69002 11.2667 9.58002 11.19C9.47335 11.11 9.39169 11.01 9.33502 10.89C9.27835 10.77 9.25002 10.63 9.25002 10.47C9.25002 10.1533 9.36169 9.90167 9.58502 9.715C9.81169 9.525 10.0834 9.43 10.4 9.43C10.6834 9.43 10.9317 9.5 11.145 9.64C11.3617 9.77667 11.53 9.96833 11.65 10.215L11.07 10.55C10.93 10.25 10.7067 10.1 10.4 10.1C10.2567 10.1 10.1434 10.1333 10.06 10.2C9.98002 10.2633 9.94002 10.3467 9.94002 10.45C9.94002 10.56 9.98502 10.65 10.075 10.72C10.1684 10.7867 10.345 10.86 10.605 10.94C10.7117 10.9733 10.7917 11 10.845 11.02C10.9017 11.0367 10.9767 11.065 11.07 11.105C11.1667 11.1417 11.24 11.1767 11.29 11.21C11.3434 11.2433 11.4034 11.2883 11.47 11.345C11.5367 11.4017 11.5867 11.46 11.62 11.52C11.6567 11.58 11.6867 11.6533 11.71 11.74C11.7367 11.8233 11.75 11.915 11.75 12.015C11.75 12.3383 11.6317 12.595 11.395 12.785C11.1617 12.975 10.8567 13.07 10.48 13.07Z" fill="white"/>
                                </svg>
                                </span>

                                Download CSV
                            </Button>
                            <Button variant={"success"} className="sendEmail" onClick={() => setModalShow(true)}>
                                Send Email
                            </Button>
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
                                        <h4 className={"font-16 mb-0"}>{content.user.firstName +" "+ content.user.lastName}</h4>
                                        <div className={"text-muted text-lowercase"}>{content.user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.treasure_chest.title}
                            </td>
                            <td>
                                {content.treasure_chest.status === "pending"
                                    ?  <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span> 
                                    :  <span class={`${classes.tag} ${classes.active}`}>Active</span>
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
                                            ? <Dropdown.Item href="#/"  onClick={() => rejectUser(content.id)}>
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
        

            <ViewProfilePopup
                userRouteAllData={props.userRouteAllData}
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}
            />

            <PushNotificationPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />


        </>
    )
}

export default AllTabData;