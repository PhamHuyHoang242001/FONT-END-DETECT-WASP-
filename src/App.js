import React, { useState } from "react";
import "./index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { getData } from "./Router";
import { Layout, Menu, Button, theme } from "antd";
import ListFarm from "./components/ListFarm";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedNav(e.key);
  };

  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedNav]}
          onClick={handleMenuClick}
          style={{ height: "100%" }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            User
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            List Farm
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
        </Menu>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedNav]}
          onClick={handleMenuClick}
          style={{ marginTop: "auto" }}
        >
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedNav === "1" && (
            <div>
              <div className="flex bg-[#F2F8FF]">
                <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  Employee
                </div>
                <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  Employee
                </div>
                <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  Employee
                </div>
                <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  Employee
                </div>
                <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  Employee
                </div>
              </div>
            </div>
          )}
          {selectedNav === "2" && <div>Content for nav 2</div>}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
