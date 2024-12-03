
import { RegisterModal } from "../components/RegisterModal";
import {LoginModal} from "../components/LoginModal";
import { LogoutButton } from "../components/LogoutButton";
import { useAuth } from "../contexts/AuthContext";


export const Home = () => {
  const {user} = useAuth();

  return (
    <>
      {!user && (
        <>
          <h3>Ej inloggad</h3>
          <RegisterModal />
          <LoginModal />
        </>
      )}
      {user && (
        <>
        <LogoutButton />
      <h3>Inloggad som: {user.name}</h3>
      </>)}
    </>
  );
};
