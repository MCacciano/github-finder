import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

import github from './axios/github';
import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// search github users
	const searchUsers = async text => {
		setLoading(true);

		try {
			const res = await github.get(`/search/users?q=${text}`);
			const users = res.data.items;

			setUsers(users);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	// get single Github user details
	const getUser = async username => {
		setLoading(true);

		try {
			const res = await github.get(`/users/${username}`);
			const user = res.data;

			setUser(user);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	// get user repos
	const getUserRepos = async username => {
		setLoading(true);

		try {
			const res = await github.get(`/users/${username}/repos?per_page=5&sort=created:asc`);
			const repos = res.data;

			setRepos(repos);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	// clear users from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => setAlert(null), 3500);
	};

	return (
		<GithubState>
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
											setAlert={showAlert}
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
										<User
											getUser={getUser}
											getUserRepos={getUserRepos}
											user={user}
											loading={loading}
											repos={repos}
											{...otherProps}
										/>
									</Fragment>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};
export default App;
