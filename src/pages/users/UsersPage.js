import React, { useContext, useEffect, useState } from "react";
import "./users.css";
import PortalNavbar from "../../components/navbar/PortalNavbar";
import ActiveUserContext from "../../shared/activeUserContext";
import { Redirect } from "react-router-dom";
import PortalSearchPager from "../../components/PortalSearchPager/PortalSearchPager";
import { Container } from "react-bootstrap";
import PortalTable from "../../components/PortalTable/PortalTable";
import server from "../../shared/server";
import UsersButtonSetComp from "../../components/usersButtonSetComp/UsersButtonSetComp";

const UsersPage = (props) => {
  const { handleLogout } = props;
  const activeUser = useContext(ActiveUserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([{ id: "12212", firstname: "ניר", lastname: "חנס", email: "nirchannes@gmail.com" }, { id: "2212", firstname: "רונית", lastname: "אברהמי", email: "ronit.av@gmail.com" }]);
  const callData = {
    desc: false,
    page: currentPage - 1,
    search: "",
    sorting: "userid",
    userstatus: 1,
  }
  useEffect(() => {
    server(activeUser, callData, "SearchStaffUnderMe").then(res => {
      const resData = res.data.users;
      setData(resData)
      // pages = res.data.pages;
      console.log(res.data.pages);
    })
  },
    [currentPage]);

  if (!activeUser) {
    return <Redirect to="/" />;
  }
  const headers = [{ key: "firstname", header: "שם פרטי" }, { key: "lastname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
  // setData([{ id: "12212", firstname: "ניר", lastname: "חנס", email: "nirchannes@gmail.com" }, { id: "2212", firstname: "רונית", lastname: "אברהמי", email: "ronit.av@gmail.com" }])




  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handelSearchSubmit = (value) => {
    alert("A search was submitted: " + value);
  };
  const handleTableClick = (value) => {
    alert("Click " + value);
  };
  // const handleButtonsetClick = (value) => {
  //   alert("Click " + value);
  // };

  console.log(data);
  return (
    <div className="p-users">
      <Container>
        <PortalNavbar handleLogout={handleLogout} />
        <br />
        <PortalSearchPager
          currentPage={currentPage}
          pages={10}
          pHolder={"חיפוש משתמשים"}
          onPageChange={handlePageChange}
          onSearchSubmit={handelSearchSubmit}
        />
        <PortalTable data={data} headers={headers} handleClick={handleTableClick} keyName="userid" />
        {/* <UsersButtonSetComp handleClick={handleButtonsetClick} btnNames=/> */}
      </Container>
    </div>
  );
};

export default UsersPage;
