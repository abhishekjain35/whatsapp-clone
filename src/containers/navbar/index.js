import NavbarComponent from "../../components/navbar";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";

const NavbarContainer = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const SignOut = async () => {
    const db = getDatabase();
    await update(ref(db, `users/${auth.currentUser.uid}`), {
      status: "offline",
    });
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <NavbarComponent
      signOut={SignOut}
      authenticated={sessionStorage.getItem("Auth Token")}
    />
  );
};

export default NavbarContainer;
