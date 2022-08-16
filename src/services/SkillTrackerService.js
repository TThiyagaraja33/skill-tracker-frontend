import axios from 'axios';

const HOST_URL = "http://43.204.100.237:4000";

const SKILL_TRACKER_QUERY_API_BASE_URL = HOST_URL + "/skill-tracker/api/v1/admin";
class SkillTrackerService {

    getEmployeeById(employeeId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Id/' + employeeId, {
            headers: headers
        });
    }

    getEmployeeByName(employeeName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Name/' + employeeName, {
            headers: headers
        });
    }

    getEmployeeBySkill(skillName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Skill/' + skillName, {
            headers: headers
        });
    }
}

export default new SkillTrackerService();