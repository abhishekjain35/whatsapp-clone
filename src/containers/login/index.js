import { notification } from "antd";
import LoginComponent from "../../components/login";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";

const LoginContainer = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const showNotification = () => {
    notification.error({
      message: "Oops, Something went wrong",
      description: "Email or password is wrong.",
    });
  };

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem(
        "Auth Token",
        userData._tokenResponse.refreshToken
      );
      const db = getDatabase();
      await update(ref(db, `users/${userData.user.uid}`), {
        status: "online",
      });
      navigate("/");
    } catch (err) {
      showNotification();
    }
  };

  return <LoginComponent onFinish={onFinish} />;
};

export default LoginContainer;
