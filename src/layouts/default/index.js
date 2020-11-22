import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

import CustomHeader from "../../components/Header";
import "./styles.scss";

const DefaultLayout = (props) => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const path = location.pathname;
  const routes = path.slice(1, path.length).split("/");

  return (
    <Layout className="layout">
      <Header>
        <CustomHeader />
      </Header>
      <Content className="site-layout">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          {routes[0] &&
            routes.map((route, i) => {
              const link = "/" + routes.slice(0, i + 1).join("/");
              return (
                <Breadcrumb.Item key={`breadcrumb-${i}`}>
                  <Link to={link}>
                    {route.replace(/^\w/, route[0].toUpperCase())}
                  </Link>
                </Breadcrumb.Item>
              );
            })}
        </Breadcrumb>
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Marvel Comics ©2020 Created by Ivan Canales
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
