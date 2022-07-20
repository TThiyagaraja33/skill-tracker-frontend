import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";


const HeaderComponent = (props) => {
    console.log(props.operation);

    const location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        if (location.state != undefined) {
            setUserName(location.state.userName);
            setRoles(location.state.roles);
        }

    }, [location]);

    const [userName, setUserName] = useState('');
    const [roles, setRoles] = useState([]);

    let userSpan;
    if (userName != '') {
        userSpan = <span style={{ color: "gold", float: 'right', marginRight: "5%" }}>Welcome : {userName}</span>;
    }

    let roleSpan;
    if (roles != []) {
        let userRole;

        if (roles.includes("ADMIN_PRIVILEGE")) {
            userRole = 'Admin privilege';
        } else {
            if (roles.includes("WRITE_PRIVILEGE")) {
                userRole = 'Edit privilege';
            } else {
                if (roles.includes("READ_PRIVILEGE")) {
                    userRole = 'View privilege';
                }
            }
        }
        roleSpan = <span style={{ color: "gold", float: 'right', marginRight: "5%" }}>{userRole}</span>;
    }

    return (
        <div style={{ backgroundColor: "#100e0e", height: "50px" }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "20px", position: "relative", top: "13%", marginLeft: "1%" }}>Employee Skill Tracker</span>
            {userSpan}
            <br />
            {roleSpan}
        </div>
    )

}

export default HeaderComponent;