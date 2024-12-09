
import { RegisterModal } from "../components/RegisterModal";
import {LoginModal} from "../components/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { SearchVet } from "../components/SearchVet";
import "../css/layout.css"




export const Home = () => {
  const {user} = useAuth();

  return (
    <>
      <SearchVet />
      {!user && (
        <>
          <RegisterModal />
          <LoginModal />
        </>
      )}
      
    </>
  );
};
