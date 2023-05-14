import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation,useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../axiosConfig";
import { useContext } from "react";
import { UserContext } from "../../App";
// import queryString from "query-string";

export default function Login() {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [nextPath, setNextPath] = useState("");
	const { updateUserData } = useContext(UserContext);
	const [useParams, setUseParams] = useSearchParams();

	const history = useNavigate();
	const location = useLocation();

	useEffect(() => {
		//  const { search } = location;
		// const values = queryString.parse(search);
		// const { next } = values;
		//  setNextPath(next);
		setNextPath(location.pathname)
		console.log("path",nextPath)
	}, []);
	let handleclick = (e) => {
		setMessage("");
		e.preventDefault();
		axios
			.post(`${BASE_URL}/auth/token/`, { username, password })
			.then((response) => {
				console.log(response);
				let data = response.data;
				localStorage.setItem("user_data", JSON.stringify(data));
				updateUserData({ type: "LOGIN", payload: data });
				console.log(nextPath)
				nextPath ? history(nextPath) : history("/");
				// history("/")
			})
			.catch((error) => {
				console.log("error", error.response.data);
				if (error.response.status === 401) {
					setMessage(error.response.data.detail);
				}
			});
	};
	return (
		<Container>
			<LeftContainer>
				<HeaderContainer>
					<Logo
						src={require("../assets/images/logo.svg").default}
						alt="Image"
					/>
				</HeaderContainer>
				<MainHeading>Travel to the best beautiful place</MainHeading>
			</LeftContainer>
			<RightContainer>
				<LoginContainer>
					<LoginHeading>Login to your Account</LoginHeading>
					<LoginInfo>Enter email and password to login</LoginInfo>
					<Form onSubmit={handleclick}>
						<InputContainer>
							<TextInput
								onChange={(e) => setusername(e.target.value)}
								type="email"
								placeholder="Email"
							/>
						</InputContainer>
						<InputContainer>
							<TextInput
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
							/>
						</InputContainer>
						<LoginButton to="/auth/create/">Signup Now</LoginButton>
						<ButtonContainer>
							<SubmitButton>Login</SubmitButton>
						</ButtonContainer>
						{message && <ErrorMessage> {message} </ErrorMessage>}
					</Form>
				</LoginContainer>
			</RightContainer>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	padding: 15px;
`;
const LeftContainer = styled.div`
	width: 55%;
	padding: 40px 70px 70px;
`;
const HeaderContainer = styled.div``;
const Logo = styled.img``;
const MainHeading = styled.h1`
	font-size: 80px;
	color: #090e5e;
	margin-top: 300px;
	line-height: 1.4em;
`;
const RightContainer = styled.div`
	background: #efefef;
	width: 45%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	border-radius: 20px;
	padding: 0 70px 70px;
`;
const LoginContainer = styled.div`
	padding-bottom: 70px;
	border-bottom: 1px solid #fff;
	width: 100%;
`;
const LoginHeading = styled.h3`
	font-size: 32px;
	font-weight: bold;
	margin-bottom: 20px;
`;
const LoginInfo = styled.p`
	font-size: 18px;
	margin-bottom: 35px;
`;
const Form = styled.form`
	width: 100%;
	display: block;
`;
const InputContainer = styled.div`
	margin-bottom: 15px;
	position: relative;
	&:before {
	}
`;
const TextInput = styled.input`
	padding: 20px 25px 20px 30px;
	width: 100%;
	display: block;
	border: none;
	border-radius: 10px;
	font-size: 18px;
	outline: none;
`;
const LoginButton = styled(Link)`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 25px;
	color: #046bf6;
	font-size: 20px;
`;
const SubmitButton = styled.button`
	background: #046bf6;
	border: 0;
	outline: 0;
	color: #fff;
	padding: 25px 40px;
	border-radius: 8px;
	font-size: 20px;
	cursor: pointer;
`;
const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;
const ErrorMessage = styled.p`
	font-size: 17px;
	color: red;
	margin-bottom: 25px;
	text-align: center;
`;