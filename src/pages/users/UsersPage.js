import React, { useContext, useState } from "react";
import "./users.css";
import PortalNavbar from "../../components/navbar/PortalNavbar";
import ActiveUserContext from "../../shared/activeUserContext";
import { Redirect } from "react-router-dom";
import PortalSearchPager from "../../components/PortalSearchPager/PortalSearchPager";
import { Container } from "react-bootstrap";
import PortalTable from "../../components/PortalTable/PortalTable";

const UsersPage = (props) => {
  const { handleLogout } = props;
  const activeUser = useContext(ActiveUserContext);
  const [currentPage, setOnPage] = useState(1);
  if (!activeUser) {
    return <Redirect to="/" />;
  }
  const headers = [{ key: "fname", header: "שם פרטי" }, { key: "lname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
  const data = [{ id: "12212", fname: "ניר", lname: "חנס", email: "nirchannes@gmail.com" }, { id: "2212", fname: "רונית", lname: "אברהמי", email: "ronit.av@gmail.com" }]

  const handlePageChange = (newPage) => {
    setOnPage(newPage);
  };

  const handelSearchSubmit = (value) => {
    alert("A search was submitted: " + value);
  };
  const handleClick = (value) => {
    alert("Click " + value);
  };
  return (
    <div className="p-users">
      <Container>
        {/* <PortalNavbar handleLogout={handleLogout} /> */}
        <PortalSearchPager
          currentPage={currentPage}
          pages={25}
          pHolder={"חיפוש משתמשים"}
          onPageChange={handlePageChange}
          onSearchSubmit={handelSearchSubmit}
        />
        <PortalTable data={data} headers={headers} handleClick={handleClick} />
      </Container>
    </div>
  );
};

export default UsersPage;
