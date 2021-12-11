import NavbarComponent from "../../components/navbar";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";
import { useEffect, useState } from "react";

const NavbarContainer = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);
  const SignOut = async () => {
    const db = getDatabase();
    await update(ref(db, `users/${auth.currentUser.uid}`), {
      status: "offline",
    });
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return <NavbarComponent signOut={SignOut} authenticated={authenticated} />;
};

export default NavbarContainer;
