import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import CATsection from './components/CATsection';
import Footer from './components/Footer';
import Notices from './components/Notices';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar />
			<Hero />
      <Features/>
      <Notices/>
      <AboutSection/>
      <CATsection/>
      <Footer/>
		</>
	);
}

export default App;
