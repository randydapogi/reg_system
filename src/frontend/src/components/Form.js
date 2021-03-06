import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import { Redirect, withRouter } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Form extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  state = {
    name: '',
    email: '',
    message: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    console.log(lead);

    const url = 'http://127.0.0.1:8000/api/lead/';

    axios({
      method: 'POST',
      url,
      data: lead,
    })
      .then((response) => {
        console.log(response.data);
        // this.getData()
        // console.log('/profile/'+response.data.id)
        this.props.history.push(`/profile/${response.data.product.id}`);
      });

    // const conf = {
    //   method: "post",
    //   body: JSON.stringify(lead),
    //   headers: new Headers({ "Content-Type": "application/json" })
    // };
    // fetch(this.props.endpoint, conf).then(response => console.log(response));
  };

  getData() {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/lead/1',
    })
      .then((response) => {
        console.log(response.data);
        this.props.history.push(`/profile/${response.data.id}`);
        // this.props.history.push('/scanner')
        // return <Redirect to='/profile/1'  />
      });
  }

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
		{/* { % csrf_token % } */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                name="message"
                onChange={this.handleChange}
                value={message}
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Send message
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Form);
