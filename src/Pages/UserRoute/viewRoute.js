import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import mapImg from "../../Images/wallstreetMapImg.jpg";
import userImg from "../../Images/userImg.png";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../../services/auth.service";
import { ENDPOINT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate , useParams} from "react-router-dom";

const ViewRoute = (props) => {

    const [user, setUser] = useState({})
    const [isLoader, setIsLoader] = useState(false);
    // console.log(" ViewRoute ~ user", user)

    let { id } = useParams();
    const navigate = useNavigate();


    const singleUserRouteData = async () => {
        await AuthService.getMethod(`${ENDPOINT.admin_route.listing}/${id}`, true)
            .then((res) => {
                setUser(res.data);
                setIsLoader(true);
                console.log("response data", res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        singleUserRouteData();
    }, []);


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }


 
    const approveUser = async () => {
        // console.log("1233"+id);
        return AuthService.postMethod(`${ENDPOINT.admin_route.approve}${id}/approve`, true)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
                setTimeout(() => {
                    navigate('/users-route');
                }, 2000);

                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


    const rejectUser = async () => {
        // console.log("1233"+id);
        return AuthService.postMethod(`${ENDPOINT.admin_route.reject}${id}/reject`, true)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
                setTimeout(() => {
                    navigate('/users-route');
                }, 2000);
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };
    return (
        <>
            <PageTitle title="Wall Street" />
            <section className={"section"}>
                <div className={classes.mapBox}>
                    {/* <img src={mapImg} alt={"map-img"} /> */}
                    {(user.picture) ? <img src={"https://api.gowild.appscorridor.com" + user.picture} width="100%" alt={"img"} /> : <img src={userImg} width="100%" alt={"img"} />}
                </div>
                <ul className={classes.mapDetail}>
                    <li>
                        <strong>Route Name</strong>
                        <span className={"text-muted"}> {user.title}</span>
                    </li>
                    <li>
                        <strong>Starting Point</strong>
                        <span className={"text-muted"}> {user.start.latitude} / {user.start.longitude} </span>
                        {/* <span className={"text-muted"}>{(user.start.latitude)? user.start.latitude : "-"}</span> */}
                    </li>
                    <li>
                        <strong>end Point</strong>
                        <span className={"text-muted"}>{user.end.latitude} / {user.end.longitude}</span>
                    </li>
                    <li>
                        <div className={classes.userInfo}>
                            <div className={classes.userImg}>
                                {(user.userPicture) ? <img src={"https://api.gowild.appscorridor.com" + user.userPicture} width="100%" alt={"img"} /> : <img src={userImg} width="100%" alt={"img"} />}
                            </div>
                            <h6>{user.firstName +" "+ user.lastName}</h6>
                        </div>
                    </li>
                </ul>
                <div className={"text-center"}>
                    <Button variant={"danger m-3"} onClick={rejectUser}>Reject</Button>
                    <Button variant={"success m-3"} onClick={approveUser}>Approve</Button>
                </div>
            </section>
    
        </>
    )
}

export default ViewRoute;