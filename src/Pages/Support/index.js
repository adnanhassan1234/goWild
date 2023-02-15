import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import userImg from "../../Images/userImg.png";
import {Form} from "reactstrap";
import AuthService from "../../services/auth.service";
import {ENDPOINT, SOCKET_URL} from "../../config/constants";
import swal from "sweetalert";
import Inbox from "./Inbox/Inbox";
import Messages from "./messages/messages";
import io from "socket.io-client";

const Support =(props) => {
    const [inbox, setInbox] = useState([]);
    const [message, setMessage] = useState([]);
    const [rowUser, setRowUser] = useState(null);
    const [isLoader, setIsLoader] = useState(false);

    const supportTickets  = async () => {
        await AuthService.getMethod(ENDPOINT.support.tickets, true,)
            .then(async (res) => {
                setInbox(res.data)
                if (res.data?.data.length > 0) {
                    await ticketMessages(res.data.data[0].id, res.data.data[0])
                }
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };
    const ticketMessages = async (id, row)=> {
        const url = (ENDPOINT.support.ticket_messages).replace(':id',id);
        await AuthService.getMethod(url, true,)
            .then((res) => {
                setMessage(res.data)
                setRowUser(row)
                setIsLoader(true)
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    useEffect( () => {

         supportTickets()
    }, []);

    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }
    return(
        <>
            <PageTitle title={"Support"} />
            <section className={"section"}>
                <div className={classes.supportblock}>
                    <Inbox inbox={inbox} ticketMessages={ticketMessages}  />
                    <Messages message={message} rowUser={rowUser}/>
                </div>
            </section>
        </>
    )
}

export default Support;