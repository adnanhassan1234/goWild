import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Form } from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import DashboardCard from "../../Components/DashboardCards";
import chartImg from "Images/chartImg.png";
import classes from "./index.module.scss";
import moment from 'moment';
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllUserChart from "./Tabs/AllUserChart";
import OnlineUserChart from "./Tabs/OnlineUserChart";
import BannedUserChart from "./Tabs/BannedUserChart";

const LandingPage = () => {

    const [content, setContent] = useState([]);
    const [onlineContent, setOnlineContent] = useState([]);
    const [bannedContent, setBannedContent] = useState([]);
    // console.log("All user", content);
    const [selectedDate, setSelectedDate] = useState("");
    const [isLoader, setIsLoader] = useState(false);


    const handleDateChange = event => {
        setSelectedDate(event.target.value);
    };

    const subAdminAllData = async () => {
        await AuthService.getMethod(`${ENDPOINT.dashboards.bar_listing}`, true)
            .then((res) => {
                // console.log("🚀 ~ file: index.js:35 ~ .then ~ res", res.data.onlineUsers)
                // 1st all user data
                setContent(res.data.newUsers.map(item => ({
                    ...item,
                    date: moment(item.date).format('MM-DD-YYYY')
                })));
                // 2nd online user data
                setOnlineContent(res.data.onlineUsers.map(item => ({
                    ...item,
                    date: moment(item.date).format('MM-DD-YYYY')
                })));
                // // 3rd banned user data
                setBannedContent(res.data.bannedUsers.map(item => ({
                    ...item,
                    date: moment(item.date).format('MM-DD-YYYY')
                })));
                setIsLoader(true);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        subAdminAllData();
    }, [])

  // download csv file
    const handleDownload = async () => {
        try {
            const res = await AuthService.getMethod(`${ENDPOINT.dashboards.csv_file}?created_date=${selectedDate}`, true);
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



    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <>
            <PageTitle title="Home" />

            <section className={"section mb-5"}>
                <DashboardCard />
            </section>
            <section className={"section"}>
                <div className={classes.btnRow}>
                    <Button variant="secondary" onClick={handleDownload}>  Download CSV </Button>
                    <Form.Control type="date" placeholder="MM/DD/YYYY" value={selectedDate}
                        onChange={handleDateChange} style={{ textTransform: 'uppercase', fontWeight: 'bold' }}></Form.Control>
                </div>
                <Tabs
                    defaultActiveKey="newuser"
                    id="uncontrolled-tab-example"
                    className="mb-3 navLinkBold"
                >
                    <Tab eventKey="newuser" title="New Users">
                        <AllUserChart content={content} />
                    </Tab>
                    <Tab eventKey="online" title="Online">
                        <OnlineUserChart onlineContent={onlineContent} />
                    </Tab>
                    <Tab eventKey="banned" title="Banned">
                        <BannedUserChart bannedContent={bannedContent} />
                    </Tab>
                </Tabs>
            </section>

        </>
    );
};

export default LandingPage;
