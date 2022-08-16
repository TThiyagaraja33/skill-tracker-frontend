import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeSkillSearchComponent = props => {
    const location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        setJsToken(location.state.jsToken);
        setUserName(location.state.userName);
        setRoles(location.state.roles);
        console.log("Token: " + jsToken);
    }, [location]);

    const [criteria, setCriteria] = useState('');
    const [searchById, setSearchById] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [searchBySkill, setSearchBySkill] = useState('');
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

    const changeSearchByIdHandler = (event) => {
        setSearchById(event.target.value);
        setCriteria('Id');
    }

    const changeSearchByNameHandler = (event) => {
        setSearchByName(event.target.value);
        setCriteria('Name');
    }

    const changeSearchBySkillHandler = (event) => {
        setSearchBySkill(event.target.value);
        setCriteria('Skill');
    }

    const searchEmployee = (e) => {
        e.preventDefault();
        
        if (criteria === 'Id') {
            navigate('/list-employee-skill', {
                state: {
                    jsToken: jsToken,
                    roles: roles,
                    userName: userName,
                    criteria: criteria,
                    value: searchById
                }
            });
        } else if (criteria === 'Name') {
            navigate('/list-employee-skill', {
                state: {
                    jsToken: jsToken,
                    roles: roles,
                    userName: userName,
                    criteria: criteria,
                    value: searchByName
                }
            });
        } else if (criteria === 'Skill') {
            //props.navigate('/employees/Skill/' + searchBySkill);
            navigate('/list-employee-skill', {
                state: {
                    jsToken: jsToken,
                    roles: roles,
                    userName: userName,
                    criteria: criteria,
                    value: searchBySkill
                }
            });
        } else {
            setErrorMessage("Please refrain your search criteria");
            return
        }
    }

    const cancel = (e) => {
        e.preventDefault();
        setSearchById("");
        setSearchByName("");
        setSearchBySkill("");
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-10">
                        <h3 className="text-center">Search Employee Profile</h3>
                        <div className="card-body">
                            <form>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> Search By Id: </label>
                                            <input placeholder="ID" name="searchById" className="form-control"
                                                value={searchById} onChange={changeSearchByIdHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label> Search By Name: </label>
                                            <input placeholder="Name" name="searchByName" className="form-control"
                                                value={searchByName} onChange={changeSearchByNameHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label> Search By Skill: </label>
                                            <input placeholder="Skill" name="searchBySkill" className="form-control"
                                                value={searchBySkill} onChange={changeSearchBySkillHandler} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {errorMessage && <div className="error"> {errorMessage} </div>}
                                </Row>
                                <br />
                                <button className="btn btn-success" onClick={searchEmployee}>Search</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeSkillSearchComponent;