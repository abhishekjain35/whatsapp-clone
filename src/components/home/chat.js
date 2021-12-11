import "./styles/chat.css";
import { Button, Input, Form } from "antd";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const ChatComponent = ({ onFinish, messages, activeUser }) => {
  const [form] = Form.useForm();

  const getStatusIcon = (status) => {
    if (status === "read") {
      return <FontAwesomeIcon icon={faCheckDouble} style={{ color: "blue" }} />;
    } else if (status === "delivered") {
      return <FontAwesomeIcon icon={faCheckDouble} />;
    } else {
      return <FontAwesomeIcon icon={faCheck} />;
    }
  };

  return (
    <div className="chat-wrapper">
      <div id="message-container">
        {messages.map((data) => (
          <div
            className={`msg-wrapper ${
              data.receiverId === activeUser.uid ? "display-right" : ""
            }`}
            key={data.docId}
          >
            <div
              className={`msg ${
                data.receiverId === activeUser.uid ? "msg-right" : "msg-left"
              }`}
            >
              <span
                className={`msg-bubble ${
                  data.receiverId === activeUser.uid
                    ? "bubble-right"
                    : "bubble-left"
                }`}
              >
                <span>{data.message}</span>
                {data.receiverId === activeUser.uid ? (
                  <span id="details">
                    <span id="time">
                      {moment(data.timestamp).fromNow()}
                    </span>
                    <span id="status">{getStatusIcon(data.status)}</span>
                  </span>
                ) : null}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-container">
        <Form
          form={form}
          name="basic"
          onFinish={(data) => {
            form.resetFields();
            onFinish(data);
          }}
          autoComplete="off"
        >
          <Form.Item
            name="message"
            rules={[
              {
                required: true,
                message: "Please input a valid message",
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Enter message..." />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", margin: "10px 0 0 0" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChatComponent;
