import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { AuthContext } from "../Contexts/AuthContext";
import { ResetContext } from "../Contexts/ResetContext";
import { Alert } from 'react-st-modal';

export const Navigation = (props) => {

  const { isLogged, setIsLogged } = useContext(AuthContext);
  const { segmentSelectedTop, setSegmentSelectedTop } = useContext(ResetContext);
  const navigate = useNavigate();
  var logout = () => {
    navigate("/");
    setSegmentSelectedTop(segmentSelectedTop + 1);
    Alert("LOGGED OUT");
    setIsLogged(false);
  }
  var forcelogin = () => {
    Alert("Please Login First");
  }
  var homepage = () => {
    setSegmentSelectedTop(segmentSelectedTop + 1);
  }

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a href='#header' onClick={homepage} className="navbar-brand page-scroll">Vehicle Configurator</a>
          {/* <Link to="/" className="navbar-brand page-scroll">
            Vehicle Configurator
          </Link>{" "} */}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              {isLogged ?
                <a href="#configurator" className="page-scroll">Configurator</a> :
                <a href='javascript:void(0)' onClick={forcelogin}>Configurator</a>}
            </li>
            {/* <li>
              <a href="/Login" className="page-scroll">
                Login
              </a>
            </li> */}
            <li>
              <a href='#contact-us-container'>Contact Us</a>
            </li>

            <li>
              {
                !isLogged ? <a href="#Auth">Login</a> : <a href='javascript:void(0)' onClick={logout}>Logout</a>
              }
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};