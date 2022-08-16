import axios from 'axios';

const HOST_URL = "http://43.204.100.237:4000";

const USER_QUERY_API_BASE_URL = HOST_URL + "/api/v1/user";

class UserService {

    findToken(userName, password) {
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

        return axios.post(HOST_URL + '/oauth/token', formBody, {
            headers: headers
        });
    }

    findUserByName(user, token) {
        let uri = USER_QUERY_API_BASE_URL+'/name?userName='+user.userName+'&password='+user.password;
        console.log("Name URI: " + uri);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(uri, {
            headers: headers
        });
    }
}

export default new UserService()