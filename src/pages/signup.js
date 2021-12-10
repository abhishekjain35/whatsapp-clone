import { Layout } from "antd";
import SignupComponent from "../containers/signup";
import NavbarContainer from "../containers/navbar";

const { Header, Content } = Layout;

const Signup = () => {
  return (
    <Layout>
      <Header>
        <NavbarContainer />
      </Header>
      <Content>
        <SignupComponent />
      </Content>
    </Layout>
  );
};

export default Signup;
