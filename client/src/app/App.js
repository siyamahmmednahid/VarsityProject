import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import Email from "../pages/Email";
import Event from "../pages/Event";
import Login from '../pages/Login'
import Forgot from '../pages/Forgot'
import Reset from '../pages/Reset'
import Todo from "../pages/Todo";
import User from "../pages/User";
import Users from "../pages/Users";
import { Context } from "../store/store";
import EmailLayout from "../components/pages/email/EmailLayout";
import Emails from "../pages/Emails";

const App = () => {
	const { userAction, authState, authAction } = useContext(Context)

	useEffect(() => {
		const data = localStorage.getItem("tms_data");
		if (data) {
			userAction.setUser(JSON.parse(data))
			authAction.setAuth();
		}
		else {
			authAction.unsetAuth();
		}
	}, [])

	return (
		<>
			{
				(authState === true) ? (
					<PrivateRoute />
				) :
					authState === false ? (
						<PublicRoute />
					) : (
						<span className="sr-only">Loading...</span>
					)
			}
		</>
	);
}

export default App;


const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<>
			<section className="dashboardArea">
				<Routes>
					<Route element={<Sidebar />}>
						<Route path="/teachers/:id" element={<User />} />
						<Route path="/teachers" element={<Users />} />
						<Route path="/event" element={<Event />} />
						<Route path="/todo" element={<Todo />} />
						{/* <Route path="/chat" element={<Chat />} /> */}
						<Route path="/emails" element={<EmailLayout />}>
							<Route path=":type">
								<Route index element={<Emails />} />
								<Route path=":emailId" element={<Email />} />
							</Route>
						</Route>
						<Route path="/" element={<Dashboard />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>
				</Routes>
			</section>
		</>
	)
}

const PublicRoute = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login");
	}, []);
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/forgot" element={<Forgot />} />
			<Route path="/reset" element={<Reset />} />
		</Routes>
	)
}