import React, { useState } from "react";
import "../index.css";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import ListUser from "../components/ListUser";
import ListDevice from "../components/ListDevice";

const { Header, Sider, Content } = Layout;
function Home() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedNav(e.key);
    if (e.key === "4") {
      navigate("/signin");
    }
  };

  return (
    <Layout className="w-full h-fit min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex flex-col h-full">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedNav]}
            onClick={handleMenuClick}
            className="flex-1"
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              List User
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              List Devices
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Add Device For User
            </Menu.Item>
          </Menu>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedNav]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header> */}
        <Content
          style={{
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedNav === "1" && <ListUser />}
          {selectedNav === "2" && <ListDevice />}
        </Content>
      </Layout>
    </Layout>
  );
}
export default Home;
