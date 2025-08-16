import Hero from '../components/Hero';
import Features from '../components/Features';
import Notices from '../components/Notices';
import AboutSection from '../components/AboutSection';
import CATsection from '../components/CATsection';
import LearningResources from '../components/LearningResources';
import Stories from '../components/Stories';
import LocalMap from '../components/LocalMap';
import AIRecommendations from '../components/AIRecommendations';
import PanchayatNoticeBoard from '../components/PanchayatNoticeBoard';

const Home = () => {
	return (
		<>
			<Hero />
			<Notices />
      {/* <LocalMap/> */}
			<Stories />
			<AIRecommendations/>
			<AboutSection />
			{/* <PanchayatNoticeBoard/> */}
			<Features />
			{/* <CATsection /> */}
		</>
	);
};

export default Home;
