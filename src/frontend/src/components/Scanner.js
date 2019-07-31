import React, { Component } from "react";
import PropTypes from "prop-types";
import axios, { post, patch, put } from 'axios';
// import QRCode from 'react-qr-code';
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-reader'


import Camera from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';


import Webcam from "react-webcam";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Scanner extends Component {

    setRef = webcam => {
        this.webcam = webcam;
      };


    state = {
        hasQRCode: false,
        qrCode: '',
        hasImage: false,
        image: '',
        profile: {},
        status: '',
        error: ''
    }

    componentDidMount() {
        // alert('asdasdas')
    }

    handleScan(data){
        if (data) {
            this.setState({
                qrCode: data,
                hasQRCode: true
            })

            var url = "http://127.0.0.1:8000/api/lead/"+ data + "/";
            alert(url)
            // var url = "https://a87da05e.ngrok.io/api/lead/"+data+ "/";
            console.log(url)
            axios({
                method: 'GET',
                url: url
            })
            .then(response => {
                this.setState({profile: response.data, status: response.data.status});
                console.log(response.data);
                alert('has data')
            })
            .catch(error => {
                alert(error)
                this.setState({error: JSON.stringify(error)})
            })
        }
    }

    onTakePhoto(data){
        // var byteString;
        // var dataURI = this.webcam.getScreenshot();
        // if (dataURI.split(',')[0].indexOf('base64') >= 0)
        //     byteString = atob(dataURI.split(',')[1]);
        // else
        //     byteString = unescape(dataURI.split(',')[1]);

        // // separate out the mime component
        // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // // write the bytes of the string to a typed array
        // var ia = new Uint8Array(byteString.length);
        // for (var i = 0; i < byteString.length; i++) {
        //     ia[i] = byteString.charCodeAt(i);
        // }

        // var new_img =  new Blob([ia], {type:mimeString});


        var dataURI = this.webcam.getScreenshot();
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        var new_img = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})



        this.setState({
            // image: data,
            image: new_img,
            hasImage: true
        })
    }

    confirmGuest(toggle){
        var isValidated = false
        if(toggle === 1){
            isValidated = true
        }

        var data = {
            // id: int(this.state.qrCode),
            isValidated: isValidated
        }

        var url = 'http://127.0.0.1:8000/api/lead/1/'
        axios({
            method: 'PATCH',
            url: url,
            data: data
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                profile: response.data
            })
        })

    }

    fileUpload(toggle){
        const url = 'http://127.0.0.1:8000/api/lead/'+this.state.profile.id+'/update/';
        const formData = new FormData();
        formData.append('file',this.state.image, "test.jpg")
        formData.append('status', this.state.status)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  put(url, formData,config)
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        console.log(this.props)
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        return(
            <div>
                <div>
                    {this.state.error}
                </div>
                {
                    (!this.state.hasQRCode) && (
                        <QrReader
                            delay={300}
                            onError={()=>{console.log('error')}}
                            onScan={data => {this.handleScan(data)}}
                            style={{ width: '100%'}}
                            />
                    )
                }{
                    (this.state.hasQRCode && !this.state.hasImage) && (
                        // <Camera
                        //     onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                        //     />
                        <div>
                            <Webcam
                            audio={false}
                            height={350}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            width={350}
                            videoConstraints={videoConstraints}
                            />
                            <button onClick={()=>{this.onTakePhoto()}}>Capture photo</button>
                        </div>
                        
                    )
                }{
                    (this.state.hasQRCode) && (
                        <div>
                            {
                                (this.state.hasImage) && (
                                    <div>
                                        <img src={this.state.image} />
                                    </div>
                                )
                            }
                            <div>

                                <div>
                                    Name: {this.state.profile.name}
                                </div>
                                <div>
                                    <select name="status" value={this.state.profile.status} onChange={(event)=>{this.handleChange(event)}}>
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Showed">Showed</option>
                                    </select>  
                                </div>
                                {
                                    (this.state.hasImage) && (
                                        <div>
                                            <button onClick={()=>{this.fileUpload(1)}}>ACCEPT</button><button onClick={()=>{this.confirmGuest(0)}}>REJECT</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                
            </div>
        )
    }

}

export default Scanner;