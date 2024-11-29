import React, { useState } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSort } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import logo from "../../../assets/logo.png";
import PropTypes from "prop-types";
import "./aside.css";
import profile from "./profile.svg";

const Sidebar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = [
    { title: "Dashboard", icon: "fas-solid fa-house", path: "/" },
    { title: "Sales", icon: "chart-line", path: "/sales" },
    { title: "Costs", icon: "chart-column", path: "/costs" },
    { title: "Payments", icon: "wallet", path: "/payments" },
    { title: "Finances", icon: "chart-pie", path: "/finances" },
    { title: "Messages", icon: "envelope", path: "/messages" },
  ];

  const bottomRoutes = [
    { title: "Settings", icon: "sliders", path: "/settings" },
    { title: "Support", icon: "phone-volume", path: "/support" },
  ];

  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItemAnimations = routes.map((_, index) =>
    useSpring({
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
      delay: 200 + index * 100,
      config: { tension: 280, friction: 120 },
    })
  );

  const bottomMenuItemAnimations = bottomRoutes.map((_, index) =>
    useSpring({
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
      delay: 200 + index * 100,
      config: { tension: 280, friction: 120 },
    })
  );

  return (
    <div className={classnames("side-bar", { "side-bar--open": isOpened, "side-bar--collapsed": isCollapsed })}>
      <div className="side-bar_header">
        <img className="logo" src={logo} alt="Logo" />
        {!isCollapsed && <h2 className="side-bar_title">Techinfly</h2>}
        <FontAwesomeIcon
          className="side-bar-action"
          icon={isOpened ? faAngleRight : faAngleLeft}
          onClick={toggleCollapse}
        />
      </div>
      <nav className="side-bar_menu">
        <ul className="side-bar_site-activities">
          {routes.map((route, index) => (
            <animated.li
              key={index}
              className="side-bar_menu-item"
              style={menuItemAnimations[index]}
              onClick={() => setIsCollapsed(false)}
            >
              <FontAwesomeIcon icon={route.icon} />
              {!isCollapsed && <span>{route.title}</span>}
            </animated.li>
          ))}
        </ul>
        <ul className="side-bar_account-activities">
          {bottomRoutes.map((route, index) => (
            <animated.li
              key={index}
              className="side-bar_menu-item"
              style={bottomMenuItemAnimations[index]}
              onClick={() => setIsCollapsed(false)}
            >
              <FontAwesomeIcon icon={route.icon} />
              {!isCollapsed && <span>{route.title}</span>}
            </animated.li>
          ))}
        </ul>
      </nav>
      <animated.div className="account" style={useSpring({
        from: { opacity: 0, transform: "translateY(-20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        delay: 200 + (routes.length + bottomRoutes.length) * 100,
        config: { tension: 280, friction: 120 },
      })}>
        <div className="account-area">
          <img src={profile} alt="#" className="account-img" />
          {!isCollapsed && (
            <div className="account-info">
              <div className="account-type">user Account</div>
              <div className="account-name"> Mark T.</div>
            </div>
          )}
        </div>
        <FontAwesomeIcon className="moreInfo-button" icon={faSort} />
      </animated.div>
    </div>
  );
};

export default Sidebar;