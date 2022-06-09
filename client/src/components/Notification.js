// Hooks
import { useState, useEffect, useContext } from "react";
// Custom CSS
import "../styles/components/notification.css";
// Bootstrap
import { Modal } from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const path = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

function Notification() {
  const [state] = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [notif, setNotif] = useState([]);

  const showNotif = async () => {
    try {
      const response = await API.get(`/notif/${state.user.id}`);
      setNotif(response.data.data); // id follow
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showNotif();
  }, []);

  return (
    <div>
      <span variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className="icon-notifikasi" icon={faBell} />
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="info-modal-notification"
      >
        <div className="notif-container">
          {notif.slice(0, 5).map((item) => (
            <div className="notif-by-person" key={item.id}>
              <div className="notif-photo">
                <img
                  className="notif-circlement"
                  src={process.env.PUBLIC_URL + path + `${item.sender.image}`}
                  alt="Gambar Notif"
                />
              </div>
              <div className="notif-content">
                <p className="notif-person-message">{item.message}</p>
              </div>
            </div>
          ))}
          {notif.length === 0 ? (
            <div className="notif-kosong">
              <div className="no-notif">
                <p>no recent notification for you</p>
              </div>
            </div>
          ) : (
            <center></center>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
