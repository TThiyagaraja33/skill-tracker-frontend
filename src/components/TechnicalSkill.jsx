import React, { Component } from 'react'
import { render } from '@testing-library/react';

class TechnicalSkill extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
        
        render() {
            return (
                <div>
                <tr>
                    <th> {props.skillName} </th>
                    <td> {props.expertiseLevel}</td>
                </tr>
                </div>
            )
        }
        
}

export default TechnicalSkill;