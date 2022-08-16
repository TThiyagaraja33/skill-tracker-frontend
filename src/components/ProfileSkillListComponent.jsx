import React, { useEffect, useState, Component } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfileSkillListComponent = props => {
    let location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        setJsToken(location.state.jsToken);
        setCriteria(location.state.criteria);
        setValue(location.state.value);
        setUserName(location.state.userName);
        setRoles(location.state.roles);
        console.log("Token: " + jsToken);

        if (criteria === 'Id') {
            SkillTrackerService.getEmployeeById(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                })
                .catch(function (error) {
                    setErrorMessage("Profile not found for the provided criteria");
                    setTimeout(() => {
                        navigate('/search-employee-skill', {
                            state: {
                                jsToken: jsToken,
                                roles: roles,
                                userName: userName
                            }
                        });
                    }, 1000);
                });
        } else if (criteria === 'Name') {
            SkillTrackerService.getEmployeeByName(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                })
                .catch(function (error) {
                    setErrorMessage("Profile not found for the provided criteria");
                    setTimeout(() => {
                        navigate('/search-employee-skill', {
                            state: {
                                jsToken: jsToken,
                                roles: roles,
                                userName: userName
                            }
                        });
                    }, 1000);
                });
        } else if (criteria === 'Skill') {
            SkillTrackerService.getEmployeeBySkill(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                })
                .catch(function (error) {
                    setErrorMessage("Profile not found for the provided criteria");
                    setTimeout(() => {
                        navigate('/search-employee-skill', {
                            state: {
                                jsToken: jsToken,
                                roles: roles,
                                userName: userName
                            }
                        });
                    }, 1000);
                });
        }
    }, [location]);

    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

    const searchEmployee = () => {
        navigate('/search-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles
            }
        });
    }

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button id="searchEmployeeBtn" className="btn btn-success" onClick={searchEmployee} style={{ width: "160px", marginLeft: "10px" }}> Go Back</button>
            </div>
            <br></br>
            <div>
                <Row>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                </Row>
            </div> 
            <div>
                {
                    employees.map( employee =>
                        <div className="row row_space">
                            <Row>
                                <Col>
                                    <table>
                                        <tr>
                                            <th className="table_header"> Employee Id </th>
                                            <td className="table_profile"> {employee.id}</td>
                                        </tr>
                                        <tr>
                                            <th className="table_header"> Employee Name </th>
                                            <td className="table_profile"> {employee.name}</td>
                                        </tr>
                                        <tr>
                                            <th className="table_header"> Employee Email ID </th>
                                            <td className="table_profile"> {employee.emailId}</td>
                                        </tr>
                                        <tr>
                                            <th className="table_header"> Employee Mobile </th>
                                            <td className="table_profile"> {employee.mobileNo}</td>
                                        </tr>      
                                    </table>
                                </Col>
                                <Col>
                                    <table>
                                        {employee.technicalSkills.map(skill => <TechnicalSkill skill = {skill}/> )}
                                    </table>
                                </Col>
                                <Col>
                                    <table>
                                        {employee.nonTechnicalSkills.map(skill => <TechnicalSkill skill = {skill}/> )}
                                    </table>                                
                                </Col>
                            </Row>
                            
                        </div>                       
                    )
                }                
            </div>
        </div>
    )
}

class TechnicalSkill extends Component {
    render() {
        var skill = this.props.skill;
        return (
            <tr>
                <th className="table_header"> {skill.skillName} </th>
                <td className="table_data"> {skill.expertiseLevel}</td>
            </tr>
        )
    }        
}

export default ProfileSkillListComponent;