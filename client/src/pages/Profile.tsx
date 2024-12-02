import { useAuth } from "../contexts/AuthContext";
import { LogoutButton } from "../components/LogoutButton";
import LoginModal from "../components/LoginModal";

export const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      {!user && (
        <>
          <LoginModal />
        </>
      )}
      {user && (
        <>
          <p>Welcome, {user.name}!</p>
          <LogoutButton />
        </>
      )}
    </>
  );
};
