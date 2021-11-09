import React, { useContext } from "react";
import { MdLibraryAdd, MdChecklist } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setUser(null);
    history.push("/");
  };

  return (
    <nav
      style={{
        background: "linear-gradient(to left, #2980b9, #2c3e50)",
      }}
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div className="container-fluid my-2">
        <a href="/" className="navbar-brand text-white mx-5">
          TODO <MdChecklist size={30} color={"white"} />
        </a>
        <div className="">
          <div className="navbar-nav ms-auto">
            <a href="/create">
              <button className="btn ml-1 btn-success mx-5">
                <MdLibraryAdd size={20} /> New Todo
              </button>
            </a>

            {user ? (
              <div>
                <p>{user.fullName}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <a href={`/login`} className="nav-item nav-link text-white mx-5">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
