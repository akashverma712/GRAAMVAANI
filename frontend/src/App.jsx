import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from './routes/ProtectedRoute';
import NoticeDetail from './components/NoticeDetail';
import EventCalendar from './components/EventCalendar';
import CommunityForum from './components/CommunityForum';
import AdditionalInfo from './components/AdditionalInfo';
import LocationFetcher from './components/LocationFetcher'; 

const App = () => {
	return (
		<Routes>
			{/* Public Routes with shared layout */}
			<Route element={<Layout />}>
				<Route
					index
					element={
						<>
							<Home />
							<LocationFetcher /> 
						</>
					}
				/>

				<Route
					path="notice"
					element={
						<ProtectedRoute>
							<NoticeDetail />
						</ProtectedRoute>
					}
				/>
				<Route
					path="Forum"
					element={
						<ProtectedRoute>
							<CommunityForum />
						</ProtectedRoute>
					}
				/>
				<Route
					path="Scheme"
					element={
						<ProtectedRoute>
							<EventCalendar />
						</ProtectedRoute>
					}
				/>
				<Route
					path="additional-info"
					element={
						<ProtectedRoute>
							<AdditionalInfo />
						</ProtectedRoute>
					}
				/>
			</Route>

			{/* Auth Pages */}
			<Route path="signup" element={<Signup />} />
			<Route path="login" element={<Login />} />
			<Route path="verify-email-address" element={<VerifyEmail />} />

			{/* Protected Dashboard */}
			<Route
				path="dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			{/* Catch-all */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default App;
