import "./styles/connectedUsers.css";
import { List, Avatar, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const ConnectedUsersComponent = ({ users, handleActiveUser, activeUser }) => {
  return (
    <div className="users-wrapper">
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={users.length}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={users}
            renderItem={(item) => (
              <List.Item
                key={item.email}
                onClick={() => handleActiveUser(item)}
                style={{ cursor: "pointer", border: "none" }}
                className={`user-profile ${
                  activeUser.uid === item.uid ? "active" : ""
                }`}
              >
                <List.Item.Meta
                  avatar={<Avatar src={"https://joeschmoe.io/api/v1/jon"} />}
                  title={item.username}
                  description={item.email}
                />
                <div>{item.status}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ConnectedUsersComponent;
