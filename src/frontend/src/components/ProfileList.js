import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import QRCode from 'react-qr-code';
import QRCode from 'qrcode.react';


import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ProfileList extends Component {
    state = {
      data: [],
    }

    componentDidMount() {
      const url = 'http://127.0.0.1:8000/api/lead/';
      console.log(url);
      axios({
        method: 'GET',
        url,
      })
        .then((response) => { this.setState({ data: response.data }); console.log(response.data); });
    }

    render() {
      return (
            <div>
                <h1>Profiles</h1>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>QR Code</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.data.map((item, index) =>
                            <tr key={item.id}>
                                <td>{index}</td>
                                <td>{item.hasImage ? <img src={item.image} style={{height: 100, width: 100}} /> : 'No Image'}</td>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                                <td><QRCode value={toString(item.id)} style={{height: 100, width: 100}} /></td>
                            </tr>
                        )}
                    </MDBTableBody>
                </MDBTable>
            </div>
      );
    }
}

export default withRouter(ProfileList);
