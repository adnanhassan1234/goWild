import React, { useEffect, useState } from "react";
import PageTitle from "../../Components/Pagetitle";
import { Tab, Tabs } from "react-bootstrap";
import AllTabData from "./Tabs/allTabData";
import PendingTabData from "./Tabs/pendingTabData";
import ApproveTabData from "./Tabs/approveTabData";
import DisapproveTabData from "./Tabs/disapproveTabData";
import AuthService from "../../services/auth.service";
import { ENDPOINT } from "../../config/constants";
import swal from "sweetalert";


const TreasureHuntRegistration = () => {

    const [content, setContent] = useState([]);
    const [approveContent, setApproveContent] = useState([]);
    const [pendingContent, setPendingContent] = useState([]);
    const [disapproveContent, setDisapproveContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const userRouteAllData = async () => {
        await AuthService.getMethod(ENDPOINT.treasure_chests.listing_hunt, true,)
            .then((res) => {
                setContent(res.data);
                setApproveContent(res.data.filter(data => ["processing"].includes(data.status)));
                setPendingContent(res.data.filter(data => ["pending"].includes(data.status)));
                setDisapproveContent(res.data.filter(data => ["disapprove"].includes(data.status)));
                setIsLoader(true);
                console.log("treasure hunt", res.data);
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
            <PageTitle title={"Thrill Seekers Attraction in Houston"} />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData content={content} userRouteAllData={userRouteAllData} />
                    </Tab>
                    <Tab eventKey="Approve" title="Approve">
                        <ApproveTabData content={approveContent} userRouteAllData={userRouteAllData} />
                    </Tab>
                    <Tab eventKey="Pending" title="Pending">
                        <PendingTabData content={pendingContent} userRouteAllData={userRouteAllData} />
                    </Tab>
                    <Tab eventKey="Disapprove" title="Disapprove">
                        <DisapproveTabData content={disapproveContent} userRouteAllData={userRouteAllData} />
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}

export default TreasureHuntRegistration;