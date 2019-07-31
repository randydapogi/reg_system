import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import QRCode from 'react-qr-code';
import QRCode from 'qrcode.react'


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ProfileList extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        var url = "http://127.0.0.1:8000/api/lead/";
        console.log(url)
        axios({
            method: 'GET',
            url: url
        })
        .then(response => {this.setState({data: response.data});console.log(response.data)})
    }

    render(){
        return(
            <div>
                <h1>Profiles</h1>
                <table border="1">
                    <tr>
                        <td>IMG</td>
                        <td>Name</td>
                        <td>STATUS</td>
                        <td>QR Code</td>
                    </tr>
                    {this.state.data.map((item, index) => 
                        // <Fragment key={item.id}>
                            <tr key={item.id}>
                                <td>{item.hasImage?<img src={item.image} />:"No Image"}</td>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                                <td><QRCode value={item.id} /></td>
                            </tr>
                        // </Fragment>
                    )}
                </table>
            </div>
        )
    }

}

export default withRouter(ProfileList);