import { Button } from "antd";
import "./style.css";
import { Link } from "react-router-dom";

const NavbarComponent = ({ signOut }) => {
  return (
    <div className="nav-wrapper">
      <Link to={"/login"}>
        <Button className="nav-btn">Login</Button>
      </Link>
      <Link to={"/signup"}>
        <Button className="nav-btn">Signup</Button>
      </Link>
      <Button className="nav-btn" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
};

export default NavbarComponent;
