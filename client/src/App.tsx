import React from "react";
import { Layout, Menu } from "antd";
import "./App.css"; 

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", label: "Startsida" },
            { key: "2", label: "Hitta Veterinär" },
            { key: "3", label: "Profil" },
            { key: "4", label: "Pet First Aid" },
          ]}
          className="app-menu"
        />
      </Header>
      <Content className="app-content">
        <div className="content-area">
         Startsida
        </div>
      </Content>
      <Footer className="app-footer">
        HittaVet ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
