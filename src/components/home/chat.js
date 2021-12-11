import "./styles/chat.css";
import { Button, Input, Form } from "antd";

const ChatComponent = ({ onFinish, messages, activeUser }) => {
  const [form] = Form.useForm();
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
                {data.message}
              </span>
              {data.receiverId === activeUser.uid ? (
                <span>{data.status}</span>
              ) : null}
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

          <Form.Item style={{ textAlign: "center" }}>
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
