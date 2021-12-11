import { notification } from "antd";
import SignupComponent from "../../components/signup";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const SignupContainer = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const showNotification = () => {
    notification.error({
      message: "Oops, Something went wrong",
      description: "Email is already in use.",
    });
  };

  const onFinish = async (values) => {
    const db = getDatabase();
    const { name, email, password } = values;
    try {
      let userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      sessionStorage.setItem(
        "Auth Token",
        userData._tokenResponse.refreshToken
      );
      await updateProfile(userData.user, { displayName: name });
      await set(ref(db, "users/" + userData.user.uid), {
        uid: userData.user.uid,
        username: name,
        email: email,
        status: "online",
      });
      navigate("/");
    } catch (err) {
      showNotification();
    }
  };

  return <SignupComponent onFinish={onFinish} />;
};

export default SignupContainer;
