import PageTitle from "../../Components/Pagetitle";
import { useNavigate } from "react-router-dom";
import imgURL from "../../Images/routelist.png";
import { React, useState, useEffect } from "react";
import { Table, Dropdown, Button, Row, Col, Form } from "react-bootstrap";
// import classes from "../index.module.scss";
import cardimg from "Images/userImg.png";
// import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from "sweetalert";
import EditRouteList from "./EditRouteList";
import ViewRouteList from "./ViewRouteList";
import profile from "Images/cardsImg.png";
import {imageUrl} from "../../Helper/Helpers";
// °

const RouteList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const [addAdmin, setAddAdmin] = useState(false);
  const [editSubAdmin, setEditSubAdmin] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewRouteList, setViewRouteList] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const goToCreateRoute = () => {
    navigate("/route-list/create");
  };

  const [content, setContent] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const routeListData = async () => {
    await AuthService.getMethod(ENDPOINT.admin_route.listing, true)
      .then((res) => {
        setContent(res.data.data);
        setIsLoader(true);
        console.log("response data", res.data.data);
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  const deleteRouteList = async (id) => {
    ENDPOINT.route.delete.id = id;
    await AuthService.deleteMethod(
      ENDPOINT.route.delete.url + ENDPOINT.route.delete.id,
      true
    )
      .then((res) => {
        routeListData();
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  useEffect(() => {
    routeListData();
  }, []);

  // convert date format to month / day / year
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/");
  }

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
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
    setIsChecked(!isChecked);
  };

  if (!isLoader) {
    return (
      <div className="loader">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Normal Route" />
      <section className={"section"}>
        <div className={"d-md-flex item-center-between mb-3"}>
          <h4 className={"my-2"}>Route List</h4>
          <Button onClick={goToCreateRoute}>Create</Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th colSpan={2}>
                {isChecked ? (
                  <Form.Check type="checkbox" onChange={handleSelectAll} />
                ) : (
                  <Form.Check type="checkbox" onClick={handleDeselectAll} />
                )}
              </th>
              <th>Name</th>
              <th>Date created</th>
              <th>Starting point Long / Lat</th>
              <th>End point Long / Lat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {content
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((content) => (
                <tr>
                  <td>
                    <Form.Check
                      type="checkbox"
                      value={content}
                      onChange={() => handleCheckboxChange(content)}
                      checked={selectedItems.includes(content)}
                    />
                  </td>
                  <td>
                    <img src={imageUrl(content.picture,profile)} style={{ width: 100, height: 100 }} alt={"img"} />
                  </td>
                  <td>{content.title}</td>
                  <td>{formatDate(content.createdDate)}</td>
                  <td>
                    {content.start.latitude} / {content.start.longitude}
                  </td>
                  <td>
                    {content.end.latitude} / {content.end.longitude}
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i className={"far fa-ellipsis-v fa-fw"}></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/"
                          onClick={() => {
                            console.log("DUCK", "RouteData", content);
                            setViewRouteList(true);
                            setViewItem(content);
                          }}
                        >
                          <i
                            className={"fal fa-eye  bg-light-yellow text-white"}
                          ></i>
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/"
                          onClick={() => {
                            setEditSubAdmin(true);
                            setEditItem(content);
                          }}
                        >
                          <i className={"far fa-pen bg-dark text-white"}></i>
                          Edit
                        </Dropdown.Item>

                        <Dropdown.Item
                          href="#/"
                          onClick={() => deleteRouteList(content.id)}
                        >
                          <i
                            className={"fal fa-trash bg-danger text-white"}
                          ></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </section>

      <EditRouteList
        show={editSubAdmin}
        onHide={() => setEditSubAdmin(false)}
        editItem={editItem}
      />

      <ViewRouteList
        show={viewRouteList}
        onHide={() => setViewRouteList(false)}
        viewItem={viewItem}
      />
    </>
  );
};

export default RouteList;
