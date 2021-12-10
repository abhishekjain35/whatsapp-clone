import { Layout } from "antd";
import HomeContainer from "../containers/home";
import NavbarContainer from "../containers/navbar";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header>
        <NavbarContainer />
      </Header>
      <Content>
        <HomeContainer />
      </Content>
    </Layout>
  );
};

export default Home;
