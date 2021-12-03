import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function SignIn() {
	const googleAuth = async ({ profileObj }) => {
		console.log(profileObj);
		// axios({
		// 	method: "post",
		// 	url: "http://localhost:3000/auth/google/signin",
		// 	data: {
		// 		googleId: profileObj?.googleId,
		// 		email: profileObj?.email,
		// 	},
		// })
		// 	.then((res) => console.log(res.data))
		// 	.catch((err) => console.log(err));
	};
	return (
		<GoogleLogin
			clientId='827647702278-3kdef7ru4itgl92tidai5l42glsp1ppt.apps.googleusercontent.com'
			onSuccess={googleAuth}
			onFailure={googleAuth}
			cookiePolicy={"single_host_origin"}
		/>
	);
}

export default SignIn;
