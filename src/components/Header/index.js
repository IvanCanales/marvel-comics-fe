import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <Menu theme="dark" mode="horizontal" inlineCollapsed={false}>
        <Menu.Item key="characters">
          <Link to="/characters">Characters</Link>
        </Menu.Item>
        <Menu.Item key="comics">
          <Link to="/comics">Comics</Link>
        </Menu.Item>
        <Menu.Item key="stories">
          <Link to="/stories">Stories</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
