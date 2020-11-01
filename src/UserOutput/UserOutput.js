import React from 'react';
const useroutput = (props) => {
	return (
		<div className="UserOutput">
			<p>Username: {props.username}</p>
			<p>Password: {props.password}</p>
		</div>
	)
}
export default useroutput
