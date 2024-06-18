import React, { useState } from "react";
import "../index.css";
import {
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import ListUser from "../components/ListUser";
import ListDevice from "../components/ListDevice";

const { Sider, Content } = Layout;
function Home() {
  const navigate = useNavigate();
  // const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedNav(e.key);
    if (e.key === "4") {
      localStorage.removeItem("userRole");
      navigate("/signin");
    }
  };

  return (
    <Layout className="w-full h-fit min-h-screen">
      <Sider trigger={null} collapsible width={"160px"}>
        <div className="demo-logo-vertical" />
        <div className="flex flex-col h-full ">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedNav]}
            onClick={handleMenuClick}
            className="flex-1 "
          >
            <div className=" w-20 mx-auto my-2">
              <img
                src="/logoPage.png"
                alt="logo"
                onClick={() => {
                  window.location.reload();
                }}
                className="cursor-pointer"
              />
            </div>
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              className="border-[#1677FF] border "
            >
              List User
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UnorderedListOutlined />}
              className=" border-[#1677FF] border "
            >
              List Devices
            </Menu.Item>
            {/* <Menu.Item key="3" icon={<PlusSquareOutlined />}>
              Add Device For User
            </Menu.Item> */}
          </Menu>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedNav]}
            onClick={handleMenuClick}
            className="mb-16"
          >
            <Menu.Item
              key="4"
              icon={<LogoutOutlined />}
              className=" border-[#1677FF]  border "
            >
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 16,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          {selectedNav === "1" && <ListUser />}
          {selectedNav === "2" && <ListDevice />}
          {/* {selectedNav === "3" && <SoldDevice />} */}
        </Content>
      </Layout>
    </Layout>
  );
}
export default Home;
