import React, {useState, useEffect, useRef} from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "../index.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import userImg from "../../../Images/userImg.png";
import {imageUrl, timeSince} from "../../../Helper/Helpers";
import io from 'socket.io-client';
import {ENDPOINT, SOCKET_URL} from "../../../config/constants";

const Messages = (props) => {
    // const { content } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [sendMessage, setSendMessage] = useState([]);
    const [ticket, setTicket] = useState(null);
    const [msg, setMsg] = useState('');
    const [ticketId, setTicketId] = useState(null);
    const socket = io(SOCKET_URL);
    const messagesEndRef = useRef(null);
    const emitEvent = async (id)=> {
        if (msg) {
            socket.emit(ENDPOINT.support.emit_message,{
                user_id: '',
                message: msg,
                token: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
                ticket_id: id
            })
            setMsg('')

        }

    };
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        if (props.rowUser?.id !== ticketId) {
            handleMessages([])
        }
        if (currentItems.length < (props.message?.data).length) {
            handleMessages(props.message?.data)
        }

        handleChange(props)
    }, [props, currentItems]);
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        socket.on('msgSupport', (data)=>{
            handleMessages([...props.message?.data, data.data])
        })
        handleChange(props)
    }, [currentItems, props]);

    const handleChange = (props) => {
        setTicket(props.rowUser)
        setTicketId(props.rowUser?.id)
    }
    const handleImage = (e) => {
        console.log(e.target.files[0])
    }
    const handleMessages = (messages) => {
        setCurrentItems(messages)
    }


    return (
        <>
            <div className={classes.msgPreview}>
                <div className={classes.chatheader}>
                    <div className={classes.userInfo}>
                        <div className={classes.userImg}>
                            <img key={ticket?.id} src={imageUrl(ticket?.user?.picture,userImg)} alt="username"/>
                        </div>
                        <div className={classes.description}>
                            <h6>{`${ticket?.user?.firstName} ${ticket?.user?.lastName}`}</h6>
                            <small className={classes.text}>{ticket?.user?.email}</small>
                        </div>
                    </div>

                </div>
                <div className={classes.mesgs}>
                    <div className={classes.msghistory}>
                        {currentItems.map((data) => (
                            <div key={data?.id} className={data?.role==='user'?classes.incoming:classes.outgoing}>
                                <div className={classes.userImg}>
                                    <img key={data?.id} src={imageUrl(data?.user?.picture,userImg)} alt="username"/>
                                </div>
                                <div className={classes.description}>
                                    <div className={classes.text}>{data?.message}
                                        <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={classes.typemsg}>
                        <div className={classes.btngroup}>
                            {/*<input type="file" id={"upload-photo"} accept=".jpg,.jpeg,.png" onChange={handleImage}/>*/}
                            {/*<button type="button" className={classes.btn}><i className="fal fa-paperclip"></i></button>*/}
                            {/*<button type="button" className={classes.btn}><i className="fal fa-image"></i></button>*/}
                            <Form.Label htmlFor={'inputAttach'} className={classes.inputAttach}>
                                <Form.Control id={'inputAttach'} type={'file'} />
                            </Form.Label>
                            <Form.Label htmlFor={'inputPicture'} className={classes.inputPicture}>
                                <Form.Control id={'inputPicture'} type={'file'} accept={".jpg,.jpeg,.png"} onChange={handleImage}/>
                            </Form.Label>

                        </div>
                        <input type="text" className={classes.formcontrol} value={msg}
                               onChange={(e) => setMsg(e.target.value)} placeholder="Type a message"/>
                        <button className={`${classes.btn} ${classes.btnSend}`} onClick={emitEvent.bind(null,ticket?.id)} type="button"><i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;