import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

import github from './axios/github';

import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null
	};

	// search github users
	searchUsers = async text => {
		this.setState({ loading: true });

		try {
			const res = await github.get(`/search/users?q=${text}`);
			const users = res.data.items;

			this.setState({ users, loading: false });
		} catch (err) {
			console.error(err);
		}
	};

	// get single Github user details
	getUser = async username => {
		this.setState({ loading: true });

		try {
			const res = await github.get(`/users/${username}`);

			this.setState({ user: res.data, loading: false });
		} catch (err) {
			console.error(err);
		}
	};

	// clear users from state
	clearUsers = () => this.setState({ users: [], loading: false });

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 3500);
	};

	render() {
		const { searchUsers, clearUsers, setAlert, getUser } = this;
		const { users, user, loading, alert } = this.state;

		return (
			<Router>
				<div>
					<Navbar title='Github Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={searchUsers}
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={setAlert}
										/>
										<Users users={users} loading={loading} />
									</Fragment>
								)}
							/>
							<Route path='/about' component={About} />
							<Route
								path='/user/:login'
								render={({ username, ...otherProps }) => (
									<Fragment>
										<User getUser={getUser} {...otherProps} user={user} loading={loading} />
									</Fragment>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
export default App;
