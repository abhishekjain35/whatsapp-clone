import { Layout } from "antd";
import LoginContainer from "../containers/login";
import NavbarContainer from "../containers/navbar";

const { Header, Content } = Layout;

const Login = () => {
  return (
    <Layout>
      <Header>
        <NavbarContainer />
      </Header>
      <Content>
        <LoginContainer />
      </Content>
    </Layout>
  );
};

export default Login;
