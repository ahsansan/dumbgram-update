// Import Css
import "../styles/components/messagezayn.css";
// React Boostrap
import { Modal } from "react-bootstrap";

function NewMessage({ show, handleClose, sendMessage }) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-send"
        dialogClassName="info-modal-send"
      >
        <Modal.Title className="send-your-message">
          Send your message
        </Modal.Title>
        <div>
          <input
            placeholder="Send Message"
            className="dm-textarea"
            onKeyPress={sendMessage}
          />
        </div>
      </Modal>
    </div>
  );
}

export default NewMessage;
