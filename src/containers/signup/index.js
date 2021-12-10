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

  const onFinish = async (values) => {
    const db = getDatabase();
    const { name, email, password } = values;
    let userData = await createUserWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem("Auth Token", userData._tokenResponse.refreshToken);
    await updateProfile(userData.user, { displayName: name });
    await set(ref(db, "users/" + userData.user.uid), {
      uid: userData.user.uid,
      username: name,
      email: email,
      status: "online",
    });
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <SignupComponent onFinish={onFinish} onFinishFailed={onFinishFailed} />
  );
};

export default SignupContainer;
