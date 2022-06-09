// Custom Css
import "../styles/components/left-menu.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSignInAlt,
  faHome,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
// React
import { useContext, useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Import API
import { API } from "../config/api";
// Context
import { UserContext } from "../context/userContext";

function LeftMenu() {
  // feed
  const [feed, setFeed] = useState([]);

  // follower
  const [follower, setFollower] = useState([]);

  // following
  const [following, setFollowing] = useState([]);

  // id user login
  const [state, dispatch] = useContext(UserContext);

  // logout
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  // feed
  const loadFeed = async () => {
    try {
      const response = await API.get(`/feedscount/${state.user.id}`);
      setFeed(response.data.data.feeds.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followers
  const loadFollower = async () => {
    try {
      const response = await API.get(`/followers/${state.user.id}`);
      setFollower(response.data.data.id_user.followers.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followings
  const loadFollowing = async () => {
    try {
      const response = await API.get(`/followings/${state.user.id}`);
      setFollowing(response.data.data.id_user.followings.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeed();
  });

  useEffect(() => {
    loadFollower();
  });

  useEffect(() => {
    loadFollowing();
  });

  return (
    <div className="container">
      <div className="left-menu-container">
        <div>
          <div className="left-menu-edit-container">
            <Link to="/edit-profile">
              <FontAwesomeIcon className="icon-notifikasi" icon={faEdit} />
            </Link>
          </div>
          <div className="left-menu-up">
            <div className="circle">
              <img
                src={process.env.PUBLIC_URL + `${state.user.image}`}
                alt="Profile"
              />
            </div>
            <div>
              <h2>{state.user.fullName}</h2>
              <p className="username">@{state.user.username}</p>
            </div>
            <div className="left-menu-statsprofile">
              <div className="left-menu-count">
                <p className="head">Post</p>
                <Link to={`/profile/${state.user.id}`}>
                  <p className="content-isi">{feed}</p>
                </Link>
              </div>
              <div className="left-menu-count-center">
                <p className="head">Followers</p>
                <p className="content">{follower}</p>
              </div>
              <div className="left-menu-count">
                <p className="head">Following</p>
                <p className="content-isi">{following}</p>
              </div>
            </div>
          </div>
          <div className="data-diri">
            <p>{state.user.bio}</p>
          </div>
          <div className="left-menu-down">
            <hr />
            <ul>
              <li>
                <Link to="/feed">
                  <FontAwesomeIcon className="icon-notifikasi" icon={faHome} />{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <FontAwesomeIcon
                    className="icon-notifikasi"
                    icon={faCompass}
                  />{" "}
                  Explore
                </Link>
              </li>
            </ul>
          </div>
          <div className="left-menu-down">
            <hr />
            <ul>
              <li>
                <div className="logout" onClick={handleLogout}>
                  <FontAwesomeIcon
                    className="icon-notifikasi"
                    icon={faSignInAlt}
                  />{" "}
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
