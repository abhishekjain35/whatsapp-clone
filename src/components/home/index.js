import ChatComponent from "./chat";
import ConnectedUsersComponent from "./connectedUsers";
import "./styles/style.css";

const HomeComponent = ({
  users,
  handleActiveUser,
  onFinish,
  messages,
  activeUser,
}) => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <ConnectedUsersComponent
          users={users}
          handleActiveUser={handleActiveUser}
          activeUser={activeUser}
        />
        <ChatComponent
          onFinish={onFinish}
          messages={messages}
          activeUser={activeUser}
        />
      </div>
    </div>
  );
};

export default HomeComponent;
