import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Tasks from './components/layout/Tasks';
import CreateTask from './components/layout/CreateTask';
import EditTask from './components/layout/EditTask';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import store from './store';

const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/" component={Tasks} />
            <Route path="/login" component={Login} />
            <Route path="/create" component={CreateTask} />
            <Route path="/edit" component={EditTask} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
export default App;
