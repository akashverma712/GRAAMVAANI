import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';


import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import CATsection from './components/CATsection';
import Footer from './components/Footer';
import Notices from './components/Notices';

function HomePage() {

	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<Notices />
			<AboutSection />
			<CATsection />
			<Footer />
		</>
	);
}

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>

			<Route
				path="/signup"
				element={<Signup />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/verify-email-address"
				element={<VerifyEmail />}
			/>

			<Route
				path="/dashboard"
				element={
					<>
						<SignedIn>
							<Dashboard />
						</SignedIn>
						<SignedOut>
							<RedirectToSignIn />
						</SignedOut>
					</>
				}
			/>

			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
}

export default App;
