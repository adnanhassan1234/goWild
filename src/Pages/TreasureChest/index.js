import React, { useState, useEffect } from 'react';
import PageTitle from "../../Components/Pagetitle";
import imgURL from "../../Images/treasureChest.png";
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import EditTreasure from './EditTreasureChests';
import ViewRoute from 'Pages/UserRoute/viewRoute';
import ViewTreasure from './ViewRoute';
import profile from "Images/cardsImg.png";



const TreasureChestList = () => {
    let { id } = useParams();



    const navigate = useNavigate();
    const goToCreateRoute = () => {
        navigate('/treasure-list/create');
    };
    const goToEditRoute = () => {
        navigate('/treasure-list/edit');
        // history.push(`/edit-form?id=${id}`);
    };

    const [selectedItems, setSelectedItems] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    const [addAdmin, setAddAdmin] = useState(false);
    const [editSubAdmin, setEditSubAdmin] = useState(false);
    const [viewTreasureChests, setViewTreasureChests] = useState(false);
    const [search, setSearch] = useState("");
    const [editItem, setEditItem] = useState(null);
    const [viewItem, setViewItem] = useState(null);


    const treasureChestsListData = async (data) => {
        await AuthService.getMethod(ENDPOINT.treasure_chests.listing, data, true)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                console.log(res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };



    const deleteTreasureChests = async (id) => {
        ENDPOINT.treasure_chests.delete.id = id;
        await AuthService.deleteMethod(ENDPOINT.treasure_chests.delete.url + ENDPOINT.treasure_chests.delete.id, true)
            .then((res) => {
                treasureChestsListData();
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        treasureChestsListData();

    }, []);

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

        return [month, day, year].join('.');
    }


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }
    
  // chekbox select all
    const handleCheckboxChange = (item) => {
        if (selectedItems.includes(item)) {
          setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
          setSelectedItems([...selectedItems, item]);
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

    return (
        <>
            <PageTitle title="Treasure Chests List" />
            <section className={"section"}>
                <div className={"d-md-flex item-center-between mb-3"}>
                    <h4 className={"my-2"}>Treasure Chest Lists</h4>
                    <Button onClick={goToCreateRoute}>Create</Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                               {isChecked? <Form.Check type="checkbox" onChange={handleSelectAll} /> : <Form.Check type="checkbox" onClick={handleDeselectAll} /> } 
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Date Created</th>
                            <th>Event Date</th>
                            <th>Starting Point/Lat</th>
                            <th>Starting Point/Long</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((item) => (
                            <tr>
                                <td><Form.Check type="checkbox" value={item}
                                    onChange={() => handleCheckboxChange(item)}
                                    checked={selectedItems.includes(item)} /></td>
                                    
                                <td style={{ width: "10%" }}>
                                   {(item.picture)? <img src={"https://api.gowild.appscorridor.com" + item.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                </td>                             
                                <td>{item.title}</td>
                                <td>{(formatDate(item.createdDate))}</td>
                                <td> {(formatDate(item.eventDate))}</td>
                                <td>{item.location.latitude}</td>
                                <td>{item.location.longitude}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <i className={"far fa-ellipsis-v fa-fw"}></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/"
                                                onClick={
                                                    () => {
                                                        setViewTreasureChests(true)
                                                        setViewItem(item)
                                                    }}
                                            >
                                            <i className="fa fa-eye text-white" aria-hidden="true" style={{backgroundColor:'#FFAE78'}}></i>
                                                {/* <i className={"fal fa-ban bg-warning text-white"}></i>
                                                <img src="image/treasure.png" width="30%" alt="" /> */}
                                                View

                                            </Dropdown.Item>

                                            <Dropdown.Item href="#/"
                                                onClick={
                                                    () => {
                                                        setEditSubAdmin(true)
                                                        setEditItem(item)
                                                    }}

                                            >
                                                <i className={"far fa-pen bg-dark text-white"}></i>
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/" onClick={() => {
                                                deleteTreasureChests(item.id)
                                            }}>
                                                <i className={"fal fa-trash  text-white"} style={{backgroundColor:"#FF2113"}}></i>
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


            <ViewTreasure
                show={viewTreasureChests}
                onHide={() => setViewTreasureChests(false)}
                viewItem={viewItem}
            />

            <EditTreasure
                treasureChestsListData={treasureChestsListData}
                show={editSubAdmin}
                onHide={() => setEditSubAdmin(false)}
                editItem={editItem}
            />


        </>
    )
}

export default TreasureChestList;
