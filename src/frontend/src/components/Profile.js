import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import QRCode from 'react-qr-code';
import QRCode from 'qrcode.react';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Profile extends Component {
    state = {
      profile: {
        id: '0',
      },
    }

    componentDidMount() {
      const url = `http://127.0.0.1:8000/api/lead/${this.props.match.params.id}/`;
      // var url = "https://a87da05e.ngrok.io/api/lead/"+this.props.match.params.id + "/";
      console.log(url);
      axios({
        method: 'GET',
        url,
      })
        .then((response) => { this.setState({ profile: response.data }); console.log(response.data); });
    }

    render() {
      console.log(this.props);
      return (
            <div>Profile {this.props.match.params.id}
                <h1>{this.state.profile.name}</h1>
                <h2>{this.state.profile.email}</h2>
                <br></br>
                <br></br>
                <br></br>
                <div>

                    <QRCode value={this.state.profile.id} />
                    {/* <QRCode value={this.state.profile.name} /> */}
                </div>

            </div>
      );
    }
}

export default withRouter(Profile);
