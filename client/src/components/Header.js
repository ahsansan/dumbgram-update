// Custom Css
import "../styles/components/header.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// React Router Dom
import { Link } from "react-router-dom";

// Notification
import Notification from "./Notification";

function Header() {
  return (
    <div className="nav-container">
      <div className="nav-head">
        <Link to="/feed">
          <img
            src={process.env.PUBLIC_URL + "/images/DumbGramIcon.png"}
            alt="DumbGram"
          />
        </Link>
      </div>
      <div className="nav-left">
        <input
          type="text"
          className="form-search-input"
          placeholder="&#xF002; 𝗦𝗲𝗮𝗿𝗰𝗵"
        />
      </div>
      <div className="nav-right">
        <div className="nav-right-menu">
          <ul>
            <li>
              <Notification />
            </li>
            <li>
              <Link to="/message">
                <FontAwesomeIcon
                  className="icon-notifikasi"
                  icon={faPaperPlane}
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className="create-post" to="/create-post">
                <span className="plusquar">
                  <span>
                    <FontAwesomeIcon className="icon-plus" icon={faPlus} />
                  </span>
                </span>{" "}
                &nbsp; <span> Create Post</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
