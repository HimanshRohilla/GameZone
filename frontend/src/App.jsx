import { useState } from "react";
import Intro from "./component/Intro.jsx";
import GameZoneNavbar from "./component/Navbar.jsx";
import Hero from "./component/Hero.jsx";
import GameCards from "./component/GameCards.jsx";
import ParallaxSection from "./component/ParallaxSection.jsx";
import GameZoneFooter from "./component/Footer.jsx";


function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <Intro onFinish={() => setIntroComplete(true)} />}

      {introComplete && (
        <>
          <GameZoneNavbar />
          <Hero />
          <GameCards />
          <ParallaxSection />
          <GameZoneFooter />
        </>
      )}
    </>
  );
}

export default App;
