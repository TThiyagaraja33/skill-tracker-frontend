import React, { useEffect, useState, Component } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";

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
                });
        } else if (criteria === 'Name') {
            SkillTrackerService.getEmployeeByName(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                });
        } else if (criteria === 'Skill') {
            SkillTrackerService.getEmployeeBySkill(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                });
        } else {
            SkillTrackerService.getEmployees(jsToken)
                .then((res) => {
                    setEmployees(res.data);
                    console.log("Employee list received" + JSON.stringify(employees));
                });
        }

        if (roles.includes("WRITE_PRIVILEGE")) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [location]);

    const [disable, setDisable] = useState('');
    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);

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
                <button id="searchEmployeeBtn" className="btn btn-success" onClick={searchEmployee} style={{ width: "160px", marginLeft: "10px" }}> Search Employee</button>
            </div>
            <br></br> 
            <div>
                {
                    employees.map( employee =>
                        <div>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <tr>
                                        <th> Employee Id </th>
                                        <td> {employee.id}</td>
                                    </tr>
                                    <tr>
                                        <th> Employee Name </th>
                                        <td> {employee.name}</td>
                                    </tr>
                                    <tr>
                                        <th> Employee Email ID </th>
                                        <td> {employee.emailId}</td>
                                    </tr>
                                    <tr>
                                        <th> Employee Mobile </th>
                                        <td> {employee.mobileNo}</td>
                                    </tr>      
                                </table>
                            </div>,                                
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    {employee.technicalSkills.map(skill => <TechnicalSkill skill = {skill}/> )}
                                </table>
                            </div> ,
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    {employee.nonTechnicalSkills.map(skill => <TechnicalSkill skill = {skill}/> )}
                                </table>
                            </div>
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
                <th> {skill.skillName} </th>
                <td> {skill.expertiseLevel}</td>
            </tr>
        )
    }        
}

export default ProfileSkillListComponent;