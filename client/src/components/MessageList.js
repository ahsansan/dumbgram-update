// Custom CSS
import "../styles/components/messagelist.css";

function MessageList({ dataContact, clickContact, contact }) {
  return (
    <div className="dm-container">
      {dataContact.length > 0 && (
        <div>
          {dataContact.map((item) => (
            <div
              key={item?.id}
              className={`dm-by-person ${
                contact?.id === item?.id && "contact-active"
              }`}
              onClick={() => clickContact(item)}
            >
              <div className="dm-photo">
                <img
                  src={process.env.PUBLIC_URL + `${item.image}`}
                  className="dm-circlement"
                  alt="user avatar"
                />
              </div>
              <div className="dm-content">
                <p className="dm-person-name">{item.fullName}</p>
                <p className="dm-person-message">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
