import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./App.css"; 
import axios from "axios";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  const [petFirstAid, setPetFirstAid] = useState<any>([]);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(
           "http://localhost:3000/api/pet-first-aid"
         ); 
         setPetFirstAid(response.data);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     fetchData();
   }, []);
  
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
          <ul>
            {petFirstAid.map((doc: any) => (
              <li key={doc.id}>
                {doc.query} ({doc.response})
              </li>
            ))}
          </ul>
        </div>
      </Content>
      <Footer className="app-footer">
        HittaVet ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
