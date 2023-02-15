import { React, useState, useEffect } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import ApprovedTabData from "./Tabs/approvedTabData";
import RejectTabData from "./Tabs/rejectTabData";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';

const UserRoute = () => {

    const [content, setContent] = useState([]);
    const [approveContent, setApproveContent] = useState([]);
    const [disapproveContent, setDisapproveContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    // setActiveContent(res.data.filter(data => ["active"].includes(data.accountStatus)));
    // setInActiveContent(res.data.filter(data => ["inActiveTabData"].includes(data.accountStatus)));

    const userRouteAllData = async () => {
        await AuthService.getMethod(ENDPOINT.users_route.listing, true,)
            .then((res) => {
                setContent(res.data.data);
                setApproveContent(res.data.data.filter(data => ["approved"].includes(data.status)));
                setDisapproveContent(res.data.data.filter(data => ["pending"].includes(data.status)));
                setIsLoader(true);
                console.log("response data", res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        userRouteAllData();
    }, []);


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }


    return (
        <>
            <PageTitle title="End-User's Routes" />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData content={content} userRouteAllData={userRouteAllData} />
                    </Tab>
                    <Tab eventKey="Approved" title="Approved">
                        <ApprovedTabData content={approveContent}  userRouteAllData={userRouteAllData}  />
                    </Tab>
                    <Tab eventKey="Reject" title="Reject">
                        <RejectTabData content={disapproveContent} userRouteAllData={userRouteAllData}  />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
};

export default UserRoute;
