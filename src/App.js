import React, { Component } from 'react';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

import github from './axios/github';

import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false
	};

	async componentDidMount() {
		this.setState({ loading: true });

		try {
			const res = await github.get('/users');
			const users = res.data;

			this.setState({ users, loading: false });
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		const { users, loading } = this.state;
		return (
			<div>
				<Navbar title='Github Finder' icon='fab fa-github' />
				<div className='container'>
					<Users users={users} loading={loading} />
				</div>
			</div>
		);
	}
}
export default App;
