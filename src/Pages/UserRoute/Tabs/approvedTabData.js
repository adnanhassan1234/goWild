import { React, useState, useEffect } from "react";
import { Table, Dropdown, Button, Row, Col, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import cardimg from "Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import profile from "Images/Ellipse 768.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , useNavigate} from 'react-router-dom';

const AllTabData = (props) => {


    const { content } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // const itemsPerPage = 3;

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

    const approveUser = async (id) => {
        // console.log("1233"+id);
        return  AuthService.postMethod(`${ENDPOINT.admin_route.approve}${id}/approve`, true)
            .then((res) => {
                 if(res.status === 201){
                    toast.success(res.data.message);
                 }
                //  setAddAdmin(props.onHide);
                 props.userRouteAllData()
                //  props.content()
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };

   
    
    const rejectUser = async (id) => {
        // console.log("1233"+id);
        return AuthService.postMethod(`${ENDPOINT.admin_route.reject}${id}/reject`, true)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
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
          (content.user?.firstName.trim() + " " + content.user.lastName.trim()).toLowerCase().includes(event.target.value.toLowerCase().trim()) ||
          content.user?.email.toLowerCase().includes(event.target.value.toLowerCase().trim())
      )
    );
    if (event.target.value.trim() === '') {
      props.userRouteAllData();
    }
  };


    return(
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
                        <th>Route Name</th>
                        <th>date posted</th>
                        <th>Event Date</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="allTabData">
                    {currentItems.map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" value={content}
                                onChange={() => handleCheckboxChange(content)}
                                checked={selectedItems.includes(content)} />
                            </td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                    {(content.picture)? <img src={"https://api.gowild.appscorridor.com" + content.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.user?.firstName + " " + content.user?.lastName}</h4>
                                        <div className={"text-muted text-lowercase"}>{content.user?.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.title}
                            </td>
                            <td>
                                {(formatDate(content.updatedDate))}
                            </td>
                            <td>
                                {(formatDate(content.createdDate))}
                            </td>
                            <td>
                                {content.status === 'approved' ? <span class="text-success text-uppercase"><b>Approved</b></span>
                                    : content.status === 'pending' ? <span class="text-warning  text-uppercase"><b>Pending</b></span>
                                        : <span class="text-danger text-uppercase"><b>Rejected</b></span>
                                }
                            </td>
                                <td>
                                <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <i className={"far fa-ellipsis-v fa-fw"}></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {content.status === 'approved'
                                                ? <Dropdown.Item href="#/" onClick={() => rejectUser(content.id)}>
                                                    {/* <i className={" fa-ban text-white"} style={{backgroundColor:'#FF2F6D'}}></i> */}
                                                    <span className="imgSpan" style={{ backgroundColor: '#FF2F6D' }}> <img src="image/reject.png" alt="" /> &nbsp;
                                                        Reject</span>
                                                </Dropdown.Item>
                                                : <Dropdown.Item href="#/" onClick={() => approveUser(content.id)}>
                                                    <span className="imgSpan" style={{ backgroundColor: '#0D5351' }}> <i class="fa fa-check" aria-hidden="true" style={{ marginTop: '3px' }} ></i> &nbsp;&nbsp;  &nbsp; &nbsp; Approve
                                                    </span>
                                                    {/* <span className="imgSpan">  </span> */}
                                                </Dropdown.Item>
                                            }
                                            <Dropdown.Item>
                                                <Link to={`/users-route/view-route/${content.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                    {/* <i className={"fal fa-eye  text-white"} style={{backgroundColor:'#FF7851'}}></i> */}
                                                    <span className="imgSpan" style={{ backgroundColor: '#FF7851' }}> <img src="image/view.png" alt="" /> &nbsp; View
                                                    </span>

                                                </Link>

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

        </>
    )
}

export default AllTabData;