import { Layout } from "antd";
import "../css/layout.css";

import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

const { Header, Content, Footer } = Layout;

const LayoutTemplate = () => {
  return (
    <Layout>
      <Header className="app-header">
        <Navigation/>
      </Header>
      <Content className="app-content">
        <div className="content-area">
          <Outlet />
        </div>
      </Content>
      <Footer className="app-footer">
        HittaVet ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default LayoutTemplate;
