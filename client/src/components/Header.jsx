import React from "react";
import { MdLibraryAdd, MdChecklist } from "react-icons/md";

const Header = () => {
  return (
    <nav
      style={{
        background: "#2980b9" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to left, #2c3e50, #2980b9)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to left, #2980b9, #2c3e50)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div class="container-fluid my-2">
        <a href="/" class="navbar-brand text-white mx-5">
          TODO <MdChecklist size={30} color={"white"} />
        </a>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto">
            <a href="/create">
              <button className="btn ml-1 btn-success mx-5">
                <MdLibraryAdd size={20} /> New Todo
              </button>
            </a>
            <a href="/" class="nav-item nav-link text-white mx-5">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
