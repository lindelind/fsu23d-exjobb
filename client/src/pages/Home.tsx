import { SearchVet } from "../components/SearchVet";
import "../css/layout.css";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const contentStyle: React.CSSProperties = {
    height: "100%",
    position: "relative",
  };

  const {t} = useTranslation();

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
            <h1 className="banner-text">{t("welcome_text")}</h1>
            <SearchVet />
          </div>
          <div className="service-description-box">
            <h2>{t("about_hittavet_title")}</h2>
            <p>{t("about_hittavet_text_1")}</p>
            <p>{t("about_hittavet_text_2")}</p>
            <p>{t("about_hittavet_text_3")}</p>
            <p>{t("about_hittavet_text_4")}</p>
          </div>
        </div>
      </Content>
    </>
  );
};
