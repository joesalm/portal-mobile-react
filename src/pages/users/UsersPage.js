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
import PortalMultipleSelect from "../../components/PortalMultipleSelect/PortalMultipleSelect";

const UsersPage = (props) => {
  const { handleLogout } = props;
  const activeUser = useContext(ActiveUserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [userRedirect, setUserRedirect] = useState("");
  const [userStatus, setUserStatus] = useState(1);
  const [data, setData] = useState({ pages: 1, users: [{ firstname: "", lastname: "", email: "..loading" }] });
  const callData = {
    desc: false,
    page: currentPage - 1,
    search: currentSearch,
    sorting: "userid",
    userstatus: userStatus,
  }
  useEffect(() => {
    server(activeUser, callData, "SearchStaffUnderMe").then(res => {
      const resData = res.data;
      setData(resData)
      console.log(res.data.pages);
    })
  },
    [currentPage, currentSearch, userStatus]);

  if (!activeUser) {
    return <Redirect to="/" />;
  }
  if (userRedirect !== "") {
    return <Redirect to={`/users/${userRedirect}`}>

    </Redirect>;
  }

  const headers = [{ key: "firstname", header: "שם פרטי" }, { key: "lastname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
  // HAEDCODED table for tests: setData([{ id: "12212", firstname: "ניר", lastname: "חנס", email: "nirchannes@gmail.com" }, { id: "2212", firstname: "רונית", lastname: "אברהמי", email: "ronit.av@gmail.com" }])




  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handelSearchSubmit = (value) => {
    console.log("Users page got search:", value);
    setCurrentSearch(value);
    setCurrentPage(1);
  };

  const handleTableClick = (value) => {
    console.log("TableClick ", value);
    setUserRedirect(value.userid);
  };
  const handleButtonsetClick = (value) => {
    let v = value;
    v = v ? 0 : 1;
    console.log("ButtonClick ", v);
    setUserStatus(v);
  };

  // ******************* testing PortalMultipleSelect
  const title = "ארוחת בקר";
  const optionList = ["גלידה", "פנקייק", "צ'יפס", "שוקולד", "ופל בלגי", "שניצל", "קטשופ", "תפוצ'יפס", "וזהו"]
  const handleSelectedChange = (selectedItems, currentItem, addOrErase) => {
    console.log(selectedItems, currentItem, addOrErase);
  }

  // ******************* testing PortalMultipleSelect

  return (
    <div className="p-users">

      <PortalNavbar handleLogout={handleLogout} />
      <br />
      <Container>
        <PortalSearchPager
          currentPage={currentPage}
          pages={data.pages}
          pHolder={"חיפוש משתמשים"}
          onPageChange={handlePageChange}
          onSearchSubmit={handelSearchSubmit}
        />
      </Container>
      <div className="usersTable">
        {/* <PortalTable data={data.users} headers={headers} handleClick={handleTableClick} keyName="userid" /> */}
        <br />
        <br />
        <br />
        <PortalMultipleSelect title={title} optionsList={optionList} callSelected={handleSelectedChange} />
      </div>
      <UsersButtonSetComp handleClick={handleButtonsetClick} btnNames={["עובדים פעילים", "לא פעילים"]} />
    </div>
  );
};

export default UsersPage;
