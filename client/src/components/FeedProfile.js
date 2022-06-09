// React Responsive Masonry
import Masonry from "react-responsive-masonry";
// Custom CSS
import "../styles/components/feed.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
// Import React Router DOM
import { Link, useParams } from "react-router-dom";
// OAS
import Aos from "aos";
import "aos/dist/aos.css";
// Hooks
import { useState, useEffect, useContext } from "react";
// API and Context
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
// Detail Feed
import DetailFeed from "./DetailFeed";
// path
const path = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

function FeedProfile() {
  const { id } = useParams();
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // feed by id
  const [feeds, setFeeds] = useState([]);
  const [feedsId, setFeedId] = useState({});
  // load Feed
  const showFeedFollow = async () => {
    try {
      const response = await API.get(`/feedscount/${id}`);
      setFeeds(response.data.data.feeds);
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  feeds.reverse();

  const handleLike = (event) => {
    const id = event.target.getAttribute("content");
    like(id);
  };

  const like = async (id) => {
    try {
      const body = JSON.stringify({ id });
      const headers = {
        headers: { "Content-Type": "application/json" },
      };
      await API.post("/like", body, headers);

      showFeedFollow();
    } catch (error) {
      console.log(error);
    }
  };

  // Load loadFeedFollow
  useEffect(() => {
    showFeedFollow();
  }, []);

  return (
    <div>
      {feeds.length > 0 ? (
        <div data-aos="fade-up">
          <Masonry columnsCount={3}>
            {feeds.map((feed) => (
              <div
                className="feed-container"
                key={feed.id}
                onClick={() => setFeedId(feed)}
              >
                <div className="feed-gambar">
                  <img
                    alt="Gambar Feed"
                    src={process.env.PUBLIC_URL + path + `${feed.fileName}`}
                    onClick={handleShow}
                    className="images-feed"
                  />
                </div>
                <div className="feed-keterangan">
                  <div className="prof-box">
                    <div className="profile">
                      <img
                        src={
                          process.env.PUBLIC_URL + path + `${feed.user.image}`
                        }
                        className="card-profiles"
                        alt="pp"
                      />
                      <p className="post-name">
                        <Link to={`/profile/${feed.user.id}`}>
                          {feed.user.username}
                        </Link>
                      </p>
                    </div>
                    <div className="icon-container">
                      {feed.likers.find((x) => x.idUser === state.user.id) ? (
                        <FontAwesomeIcon
                          className="card-icon text-danger"
                          onClick={handleLike}
                          icon={faHeart}
                          content={feed.id}
                        />
                      ) : feed.likers.length === 0 ? (
                        <FontAwesomeIcon
                          className="card-icon"
                          onClick={handleLike}
                          icon={faHeart}
                          content={feed.id}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="card-icon"
                          onClick={handleLike}
                          icon={faHeart}
                          content={feed.id}
                        />
                      )}
                      <FontAwesomeIcon
                        className="card-icon"
                        icon={faComment}
                        onClick={handleShow}
                      />
                      <FontAwesomeIcon
                        className="card-icon"
                        icon={faPaperPlane}
                      />
                    </div>
                  </div>
                </div>
                <div className="navlike">
                  <div>
                    <p className="like-total">{feed.likers.length} Likes</p>
                  </div>
                </div>
              </div>
            ))}
            <DetailFeed
              show={show}
              handleClose={handleClose}
              feedsId={feedsId}
              showFeedFollow={showFeedFollow}
            />
            <br />
            <br />
          </Masonry>
        </div>
      ) : (
        <div className="feed-kosong">
          <div className="nopost" data-aos="fade-up">
            <h3>No Post</h3>
            <p className="childnopost">you don't have any post</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedProfile;
