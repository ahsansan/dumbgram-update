import LeftMenu from "../components/LeftMenu";
import Header from "../components/Header";
import Feed from "../components/Feed";
import { useEffect } from "react";

function FeedPage() {
  useEffect(() => {
    document.title = "Feeds | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <LeftMenu />
        </div>
        <div className="home-right">
          <div>
            <div>
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
