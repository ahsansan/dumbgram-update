import Profile from "../components/Profile";
import Header from "../components/Header";
import FeedProfile from "../components/FeedProfile";
import LeftMenu from "../components/LeftMenu";
import { useEffect, useContext } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// UseContext
import { UserContext } from "../context/userContext";

function ProfilePage() {
  // Context
  const [state, dispatch] = useContext(UserContext);

  const { id } = useParams();
  const yourId = state.user.id;
  const profilePage = id;

  useEffect(() => {
    document.title = "Profile | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        {yourId == profilePage ? (
          <div className="home-left">
            <LeftMenu />
          </div>
        ) : (
          <div className="home-left">
            <Profile />
          </div>
        )}
        <div className="home-right">
          <div>
            <FeedProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
