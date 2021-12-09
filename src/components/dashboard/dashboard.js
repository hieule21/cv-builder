import React from "react";
import "./dashboard.css";

import thomasAvatar from "../../assets/thomasAvatar.jpg";
import { Link } from "react-router-dom";

import {
  Layout,
  Menu,
  Avatar,
  PageHeader,
  Button,
  Dropdown,
  Badge,
  Popover,
  Drawer,
  Input,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProjectFilled,
  HomeOutlined,
  PoweroffOutlined,
  SearchOutlined,
  BellOutlined,
  ProfileOutlined,
  TeamOutlined,
  CaretDownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

const DashBoard = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { children, title } = props;
  //Component-Supporters
  const [collapsed, setCollapsed] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleOnclick = () => {
    dispatch({ type: "auth/logout" });
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer">Settings</a>
      </Menu.Item>
      <Menu.Item>
        <p rel="noopener noreferrer" onClick={handleOnclick}>
          Logout
        </p>
      </Menu.Item>
    </Menu>
  );

  //Render
  return (
    <section className="dashboard-section">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div
            className="logo"
            style={collapsed ? { height: "10vh" } : { margin: "0.3rem 0" }}
          >
            <Avatar size={collapsed ? 48 : 78} src={thomasAvatar} />
            <p style={collapsed ? { display: "none" } : null}>Thomas Hanson</p>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/home"]}
            selectedKeys={[location.pathname]}
          >
            <h3 style={collapsed ? { display: "none" } : null}>MENU</h3>
            <Menu.Item key="/home" icon={<HomeOutlined />}>
              <NavLink to="/home">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="/project" icon={<ProjectFilled />}>
              <NavLink to="/project">Projects</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              People
            </Menu.Item>
            <h3 style={collapsed ? { display: "none" } : null}>ACCOUNT</h3>
            <Menu.Item key="4" icon={<ProfileOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="6" icon={<PoweroffOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={
              collapsed
                ? { padding: 0, marginLeft: "5rem" }
                : { padding: 0, marginLeft: "12.5rem" }
            }
          >
            <div className="header-title">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                { className: "trigger", onClick: toggle }
              )}
              <PageHeader
                className="site-page-header"
                title={title}
                style={{ float: "right", height: "62px" }}
              />
            </div>
            <div className="header-function">
              <Popover content="Search">
                <Button
                  type="text"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={showDrawer}
                />
              </Popover>
              <Badge count={5}>
                <Popover content="Notifications">
                  <Button type="text" shape="circle" icon={<BellOutlined />} />
                </Popover>
              </Badge>
              <Popover content="Profile">
                <Avatar src={thomasAvatar} style={{ cursor: "pointer" }} />
              </Popover>
              <Dropdown overlay={menu} placement="bottomCenter">
                <CaretDownOutlined style={{ cursor: "pointer" }} />
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={
              collapsed ? { marginLeft: "6.5rem" } : { marginLeft: "14rem" }
            }
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <Drawer
        width="400"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ border: "none", borderBottom: "1px solid rgb(0,82,204)" }}
        />
        <h3 style={{ margin: "1rem 0" }}>RECENT SEARCHES</h3>
        <p>What is this site about?</p>
        <p>Best CVs for software engineering</p>
        <p>Some contents...</p>
      </Drawer>
    </section>
  );
};

export default DashBoard;
