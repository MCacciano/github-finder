import React, { Component } from 'react';

export class User extends Component {
	async componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}

	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable
		} = this.props.user;

		const { loading } = this.props;

		return (
			<div>
				<h2>{name}</h2>
			</div>
		);
	}
}

export default User;
