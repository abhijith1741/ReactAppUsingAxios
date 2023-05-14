import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React, { useEffect, useState } from "react";
import RoutePath from "./components/RoutePath";

export const UserContext = React.createContext();

function App(props) {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);

	const updateUserData = (action) => {
		switch (action.type) {
			case "LOGOUT":
				setUserData("");
				localStorage.clear();
				break;
			case "LOGIN":
				setUserData(action.payload);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem("user_data")));
		setLoading(false);
	}, []);
	return loading ? (
		<h1>Loading ..</h1>
	) : (
		<UserContext.Provider value={{ userData, updateUserData }}>
			<Router>
				<Routes>
					<Route path="/" exact element={<Places />} />
					<Route path="/auth/login/" exact element={<Login />} />
					<Route path="/auth/create/" exact element={<Signup />} />
					<Route path="/place/:id" element = {userData ? <Place /> : <Login />}  />
					<Route element={<NotFound />} />
				</Routes>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
