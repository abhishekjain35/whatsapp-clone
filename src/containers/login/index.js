import LoginComponent from "../../components/login";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, update } from "firebase/database";

const LoginContainer = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    const userData = await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem("Auth Token", userData._tokenResponse.refreshToken);
    const db = getDatabase();
    await update(ref(db, `users/${userData.user.uid}`), {
      status: "online",
    });
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return <LoginComponent onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default LoginContainer;
