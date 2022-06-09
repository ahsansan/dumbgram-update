import Welcome from "../components/Welcome";
import Explore from "../components/Explore";
import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    document.title = "Dumbgram | Share your moments";
  });
  return (
    <div className="lp-bg">
      <div className="lp-container">
        <div className="lp-left">
          <Welcome />
        </div>
        <div className="lp-right">
          <Explore />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
