import React from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import {Tab, Tabs} from "react-bootstrap";
import TermsAndConditions from "./Tabs/termsAndConditions";
import Faqs from "./Tabs/faqs";
import EWaiver from "./Tabs/eWaiver";


const Guidlines =(props) => {
    return(
        <>
            <PageTitle title={"Guidlines"} />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="termsandconditions"
                    className="mb-3"
                >
                    <Tab eventKey="termsandconditions" title="Terms & Conditions">
                        <TermsAndConditions />
                    </Tab>
                    <Tab eventKey="faq" title="FAQ">
                        <Faqs />
                    </Tab>
                    <Tab eventKey="ewaiver" title="E-Waiver">
                        <EWaiver />
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}

export default Guidlines;