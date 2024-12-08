
import { RegisterModal } from "../components/RegisterModal";
import {LoginModal} from "../components/LoginModal";
import { LogoutButton } from "../components/LogoutButton";
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
          <h3>Ej inloggad</h3>
          <RegisterModal />
          <LoginModal />
        </>
      )}
      {user && (
        <>
          <h3>Inloggad som: {user.name}</h3>
          <LogoutButton />
        </>
      )}
    </>
  );
};
