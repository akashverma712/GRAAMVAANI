import Hero from '../components/Hero';
import Features from '../components/Features';
import Notices from '../components/Notices';
import AboutSection from '../components/AboutSection';
import CATsection from '../components/CATsection';
import LearningResources from '../components/LearningResources';
import Stories from '../components/Stories';
import LocalMap from '../components/LocalMap';

const Home = () => {
	return (
		<>
			<Hero />
			<Notices />
      {/* <LocalMap/> */}
			<LearningResources />
			<Stories />
			<AboutSection />
			<Features />
			{/* <CATsection /> */}
		</>
	);
};

export default Home;
