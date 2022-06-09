import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import Header from "../components/Header";
import MessageList from "../components/MessageList";
import MessageDetail from "../components/MessageDetail";

import { Container, Row, Col } from "react-bootstrap";

import { UserContext } from "../context/userContext";

let socket;

function MessagesPage() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io("https://dumbgram-be-ahsan.herokuapp.com/", {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: state.user.id,
      },
    });

    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    loadContact();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContact = () => {
    socket.emit("load contacts");
    socket.on("contacts", (data) => {
      let dataContacts = data.map((item) => ({
        ...item,
        message:
          messages.lenght > 0
            ? messages[messages.length - 1].message
            : "Click here to start message",
      }));
      setContacts(dataContacts);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  const loadMessages = () => {
    socket.on("messages", async (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idReceiver: contact.id,
        message: e.target.value,
      };

      socket.emit("send message", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <Header />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col
            md={3}
            style={{ height: "89.5vh" }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <MessageList
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ height: "89.5vh" }} className="px-1">
            <MessageDetail
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MessagesPage;
