import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';
import Table from './Table';
import Form from './Form';
import AppContainer from './AppContainer';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const App = () => (
//   <DataProvider endpoint="api/lead/"
//                 render={data => <Table data={data} />} />
	<AppContainer />
);
const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
