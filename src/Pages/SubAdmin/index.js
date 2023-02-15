import React, { useState, useEffect } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import ActiveTabData from "./Tabs/activeTabData";
import InActiveTabData from "./Tabs/inActiveTabData";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';


const SubAdmin = () => {

    const [content, setContent] = useState([]);
    const [activeContent, setActiveContent] = useState([]);
    const [InActiveContent, setInActiveContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [status, setStatus] = useState('');

    const subAdminAllData = async () => {
        await AuthService.getMethod(ENDPOINT.sub_admin.listing, true,)
        .then((res) => {
            setContent(res.data);
            setActiveContent(res.data.filter(data => ["active"].includes(data.accountStatus)));
            setInActiveContent(res.data.filter(data => ["inactive"].includes(data.accountStatus)));
            setIsLoader(true);
            console.log(res.data);
            
        })
        .catch((err) => {
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
        });
    };


    const deleteSubAdmin = async (id) => {
        ENDPOINT.sub_admin.delete.id = id;
        await AuthService.deleteMethod(ENDPOINT.sub_admin.delete.url + ENDPOINT.sub_admin.delete.id, true)
            .then((res) => {
                subAdminAllData();
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        subAdminAllData();
    }, []);
    // content,activeContent,InActiveContent

    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }



    return (
        <>
            <PageTitle title="Sub Admin" />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData content={content} deleteSubAdmin={deleteSubAdmin} subAdminAllData={subAdminAllData} />
                    </Tab>
                    <Tab eventKey="Active" title="Active">
                        <ActiveTabData content={activeContent} subAdminAllData={subAdminAllData}  deleteSubAdmin={deleteSubAdmin} />
                    </Tab>
                    <Tab eventKey="Inactive" title="Inactive">
                       <InActiveTabData content={InActiveContent} subAdminAllData={subAdminAllData}  deleteSubAdmin={deleteSubAdmin} />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
};

export default SubAdmin;
