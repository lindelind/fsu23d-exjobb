import { SearchVet } from "../components/SearchVet";
import "../css/layout.css";
import { Content } from "antd/es/layout/layout";

export const Home = () => {
  const contentStyle: React.CSSProperties = {
    height: "100%",
    position: "relative",
  };

  return (
    <>
      <Content
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <div style={contentStyle}>
          <img className="banner-image" src="/1.png" alt="Banner" />
          <div className="content-overlay">
            <h1 className="banner-text">Welcome to Vet Finder</h1>
            <SearchVet />
          </div>
        </div>
      </Content>
    </>
  );
};
