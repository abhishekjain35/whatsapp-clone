import { Button } from "antd";
import "./style.css";
import { Link } from "react-router-dom";

const NavbarComponent = ({ signOut, authenticated }) => {
  return (
    <div className="nav-wrapper">
      {authenticated ? (
        <Button className="nav-btn" onClick={signOut}>
          Sign out
        </Button>
      ) : (
        <>
          <Link to={"/login"}>
            <Button className="nav-btn">Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button className="nav-btn">Signup</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarComponent;
