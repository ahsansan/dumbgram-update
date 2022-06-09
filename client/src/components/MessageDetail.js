// Import Css
import "../styles/components/messagezayn.css";
// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function MessageDetail({ contact, user, messages, sendMessage }) {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-up">
      {contact ? (
        <div>
          <div
            id="chat-messages"
            style={{ height: "80vh" }}
            className="overflow-auto px-3 py-3"
          >
            {messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`d-flex py-1 ${
                    item.idSender === user.id
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {item.idSender !== user.id && (
                    <img
                      src={process.env.PUBLIC_URL + `${contact?.image}`}
                      className="detail-dm-circlement mx-2"
                      alt="bubble avatar"
                    />
                  )}
                  <div
                    className={
                      item.idSender === user.id ? "chat-me" : "chat-other"
                    }
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "6vh" }} className="px-3">
            <input
              placeholder="Send Message"
              className="dm-textarea"
              onKeyPress={sendMessage}
            />
          </div>
        </div>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </div>
  );
}

export default MessageDetail;
