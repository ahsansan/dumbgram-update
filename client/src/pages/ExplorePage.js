import LeftMenu from "../components/LeftMenu";
import Header from "../components/Header";
import ExplorePost from "../components/ExplorePost";

function ExplorePage() {
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
              <ExplorePost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
