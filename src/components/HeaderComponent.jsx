import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const HeaderComponent = (props) => {
    console.log(props.operation);

    const location = useLocation();

    let navigate = useNavigate();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        if (location.state != undefined) {
            setUserName(location.state.userName);
            setRoles(location.state.roles);
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [location]);

    const [userName, setUserName] = useState('');
    const [roles, setRoles] = useState([]);
    const [disabled, setDisabled] = useState('');

    let userSpan;
    if (userName != '') {
        userSpan = <span style={{ color: "gold", float: 'right', marginRight: "11%" }}>Welcome  {userName}</span>;
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
        roleSpan = <span style={{ color: "gold", float: 'right', marginRight: "1%" }}>
            {userRole}
            </span>;
    }

    const cancel = (e) => {
        e.preventDefault();
        setRoles('');
        setUserName('');
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: "#100e0e", height: "70px" }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "20px", position: "relative", top: "13%", marginLeft: "1%" }}>Employee Skill Tracker</span>
            {userSpan}
            <br />
            <button className="btn btn-danger signout" onClick={cancel} hidden={disabled}>Sign Out</button>
            {roleSpan}
        </div>
    )

}

export default HeaderComponent;