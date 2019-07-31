import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import Form from "./Form"
import Profile from "./Profile"
import Scanner from "./Scanner"
import ImageUpload from "./ImageUpload"
import ProfileList from "./ProfileList"


import { BrowserRouter, Route, Switch } from 'react-router-dom';


class AppContainer extends Component {
	state = {data: []}
	render() {
        // console.log(datas)
		return (
            // <Form />
            // <Table data={this.state.data} />
            <BrowserRouter basename='react/'>
                <div style={{width: '100%'}}>
                    <Switch>
                        <Route path="/form" render={() => (<Form />)} exact />
                        <Route path="/profile/:id" render={ () => <Profile /> } />
                        <Route path="/profile" render={ () => <ProfileList exact /> } />
                        <Route path="/scanner" component={Scanner} />
                        <Route path="/upload" component={ImageUpload} />
                        <Route path="/" render={() => (<Table data={this.state.data} />)} />  
                    </Switch>
                </div>
			</BrowserRouter>
		)
	}
}

export default AppContainer;