import "./styles/connectedUsers.css";
import { useState, useEffect } from "react";
import { List, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const ConnectedUsersComponent = ({ users, handleActiveUser, activeUser }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="users-wrapper">
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={users.length}
          next={loadMoreData}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={users}
            renderItem={(item) => (
              <List.Item
                key={item.email}
                onClick={() => handleActiveUser(item)}
                style={{ cursor: "pointer" }}
                className={`${activeUser.uid === item.uid ? "active" : ""}`}
              >
                <List.Item.Meta
                  avatar={<Avatar src={"https://joeschmoe.io/api/v1/jon"} />}
                  title={<a href="https://ant.design">{item.username}</a>}
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
