// App.js
// Import 'motion' from 'motion/react' for any motion components used here (though none directly in App.js usually)
// import { motion } from 'motion/react'; // Not strictly needed here unless you add animations to App's root div

// Import your section components


import Navbar from './components/SectionComponents/NavBar';
import MainRoutes from './routes/MainRoutes';

// Remove MainRoutes if this is a single-page landing layout
// import MainRoutes from './routes/MainRoutes';

const App = () => {
  

  return (
    // Main app container: controls overall background, overflow, and provides padding for fixed navbar
    // Ensure html,body have margin:0, padding:0, overflow-x-hidden in global CSS
    <div className='bg-black overflow-x-hidden pt-10'> {/* pt-20 to account for fixed Navbar height */}
      <Navbar /> {/* Fixed Navbar */}
      <MainRoutes />
      
    </div>
  );
};

export default App;