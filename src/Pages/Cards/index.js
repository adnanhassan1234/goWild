import React from "react";
import {Tabs, Tab} from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import GoogleTabData from "./Tabs/googleTabData";
import InternalTabData from "./Tabs/internalTabData";

const CardsPage = () => {
    return (
        <>
            <PageTitle title="Cards" />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData />
                    </Tab>
                    <Tab eventKey="Active" title="Google">
                        <GoogleTabData />
                    </Tab>
                    <Tab eventKey="Inactive" title="Internal">
                        <InternalTabData />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
};

export default CardsPage;
