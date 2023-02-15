import React, { useEffect, useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import ActiveTabData from "./Tabs/activeTabData";
import DisableTabData from "./Tabs/disableTabData";
import AuthService from "../../services/auth.service";
import { ENDPOINT } from "../../config/constants";
import swal from "sweetalert";

const Users = () => {
  const [content, setContent] = useState([]);
  const [activeContent, setActiveContent] = useState([]);
  const [disableContent, setDisableContent] = useState([]);
  const [isLoader, setIsLoader] = useState(false);


  const subAdminAllData = async () => {
    await AuthService.getMethod(ENDPOINT.admin_user.listing, true,)
      .then((res) => {

      //   let content = res.data.filter(obj => {
      //     if (obj.status === "approved") {
      //         return obj
      //     }
      // });

        setContent(res.data)
        setActiveContent(res.data.filter(data => ["active"].includes(data.accountStatus)));
        setDisableContent(res.data.filter(data => !["active"].includes(data.accountStatus)));
        setIsLoader(true);
        console.log(res.data);
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  const deleteSubAdmin = async (id) => {
    ENDPOINT.admin_user.delete.id = id;
    await AuthService.deleteMethod(ENDPOINT.admin_user.delete.url + ENDPOINT.admin_user.delete.id, true)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  useEffect(() => {
    subAdminAllData();
  }, []);
  // content
  
  if (!isLoader) {
    return (
      <div className='loader'>
        <h3>Loading...</h3>
      </div>
    );
  }


  return (
    <>
      <PageTitle title="Users" />
      <section className={"section"}>
        <Tabs
          defaultActiveKey="All"
          className="mb-3"
        >
          <Tab eventKey="All" title="All"  >
            <AllTabData subAdminAllData={subAdminAllData} content={content} deleteSubAdmin={deleteSubAdmin} />
          </Tab>
          <Tab eventKey="Active" title="Active" >
            <ActiveTabData subAdminAllData={subAdminAllData} content={activeContent} deleteSubAdmin={deleteSubAdmin} />
          </Tab>
          <Tab eventKey="Disabled" title="Disabled" >
            <DisableTabData subAdminAllData={subAdminAllData} content={disableContent} deleteSubAdmin={deleteSubAdmin} />
          </Tab>
        </Tabs>
      </section>
    </>
  );
};

export default Users;
