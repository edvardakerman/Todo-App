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
            {user ? (
              <div className="navbar-nav">
                <a className="" href="/create">
                  <button className="btn mx-5 my-2 btn-success text-center">
                    <MdLibraryAdd size={20} /> New Todo
                  </button>
                </a>
                <p className="navbar-nav my-3 text-center mx-5">
                  {user.fullName}
                </p>
                <button
                  className="btn btn-dark my-2 text-white mx-5"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-nav">
                <button className="btn btn-primary my-2 text-white mx-5">
                  <a
                    className="nounderline text-decoration-none text-white"
                    href="/login"
                  >
                    Login
                  </a>
                </button>
                <button className="btn btn-dark my-2 text-white mx-5">
                  <a
                    className="nounderline text-decoration-none text-white"
                    href="/register"
                  >
                    Register
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
