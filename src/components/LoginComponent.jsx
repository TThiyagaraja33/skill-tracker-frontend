import { Col, Row } from "react-bootstrap";
import React, { useState } from 'react';
import UserService from '../services/UserService';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const HOST_URL = "http://localhost:4000";

const LoginComponent = () => {
    const [userName, setUserNamed] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const Login = (e) => {
        e.preventDefault();

        var details = {
            'username': userName,
            'password': password,
            'grant_type': 'password'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic c2tpbGx0cmFja2VyQ2xpZW50OnNraWxsdHJhY2tlclNlY3JldA=='
        }

        axios.post(HOST_URL + '/oauth/token', formBody, {
            headers: headers
        })
            .then(function (response) {
                console.log("Response Received: " + JSON.stringify(response.data));
                const tokenTemp = response.data.access_token;
                console.log("Token Inside: " + tokenTemp);

                if (tokenTemp != null) {
                    const user = {
                        userName: userName, password: password
                    };
                    UserService.findUserByName(user, tokenTemp)
                        .then(res => {
                            let roles = res.data.users.roles;

                            if (roles.includes("ADMIN_PRIVILEGE")) {
                                navigate('/search-employee-skill', {
                                    state: {
                                        jsToken: tokenTemp,
                                        roles: roles,
                                        userName: userName
                                    }
                                });
                            }
                            return
                        });
                } else {
                    // handle error
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const ChangeUserNameHandler = (event) => {
        setUserNamed(event.target.value);
    }

    const ChangePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-8">
                        {<h3 className="text-center">Login</h3>}

                        <div className="card-body">
                            <form>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> User Name: </label>
                                            <input placeholder="user name" name="userName" className="form-control"
                                                value={userName} onChange={ChangeUserNameHandler} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> Password: </label>
                                            <input type="password" placeholder="password" name="password" className="form-control"
                                                value={password} onChange={ChangePasswordHandler} />
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <button className="btn btn-success" onClick={Login}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default LoginComponent;