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
  const [optionsList, setOptionsList] = useState([{
    option: "גלידה",
    optionLabel: "1",
    select: false,
  }, {
    option: "פיתוח אפליקציות web",
    optionLabel: "2",
    select: false,
  }, {
    option: "צ'יפס",
    optionLabel: "3",
    select: false,
  }, {
    option: "שוקולד",
    optionLabel: "4",
    select: false,
  }, {
    option: "ופל בלגי",
    optionLabel: "5",
    select: false,
  }, {
    option: "שניצל",
    optionLabel: "6",
    select: false,
  }, {
    option: "קטשופ",
    optionLabel: "7",
    select: false,
  }, {
    option: "תפוצ'יפס",
    optionLabel: "8",
    select: false,
  }, {
    option: "וזהו",
    optionLabel: "9",
    select: false,
  }
  ]);
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
      setData(resData);
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

  const handleSelectedChange = (selectedItems, currentItem, addOrErase) => {
    console.log(selectedItems, currentItem, addOrErase);
    setOptionsList(selectedItems)
  }


  return (
    <div className="p-users">

      <PortalNavbar title={"משתמשים"} handleLogout={handleLogout} />
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
        {/* <br />


        <PortalMultipleSelect title={title} optionsList={optionsList} callSelected={handleSelectedChange} />
        <br /> */}

        <PortalTable data={data.users} headers={headers} handleClick={handleTableClick} keyName="userid" />
        <br />
      </div>
      <UsersButtonSetComp handleClick={handleButtonsetClick} btnNames={["עובדים פעילים", "לא פעילים"]} />
    </div>
  );
};

export default UsersPage;
