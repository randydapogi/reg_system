import React, { Component } from "react";
import PropTypes from "prop-types";
import axios, { post, patch, put } from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ImageUpload extends Component {
    state = {
        
    }

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }
      fileUpload(file){
        // const url = 'http://127.0.0.1:8000/api/lead/1/upload_pic/';
        const url = 'http://127.0.0.1:8000/api/lead/1/update/';
        const formData = new FormData();
        formData.append('file',file)
        formData.append('status', 'Showed')
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  put(url, formData,config)
      }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default ImageUpload;