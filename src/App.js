import React, { useEffect, useState } from "react";
import "./index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useFormik } from "formik";

import { getData, updateData } from "./fetchMethod";
import { Layout, Menu, Button, theme, Modal } from "antd";
import ListFarm from "./components/ListFarm";
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("1");
  const [state, setState] = useState({
    data: [],
    isModalOpen: false,
    check: false,
  });
  const { data, isModalOpen, check } = state;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedNav(e.key);
  };
  const getData1 = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/camdevice/farm/${farmID}`
    );
    setState((pre) => ({
      ...pre,
      data: res,
    }));
  };
  const farmID = "6584d4dd1e2df1164f11bc7b";
  useEffect(() => {
    getData1();
  }, []);
  const handleOk = () => {
    formik.handleSubmit();
    setState((pre) => ({
      ...pre,
      isModalOpen: false,
    }));
  };
  const handleCancel = () => {
    setState((pre) => ({
      ...pre,
      isModalOpen: false,
    }));
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      delayTime: "",
      resolution: "",
    },
    onSubmit: (data) => {
      updateData(`http://103.176.178.96:8000/api/v1/camdevice/${data.id}`, {
        name: data.name,
        delayTime: data.delayTime,
        resolution: data.resolution,
        farmID: farmID,
      });
      getData1();
    },
  });
  return (
    <Layout className="w-full max-h-screen min-h-screen">
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
              User
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              List Devices
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
          >
            <Menu.Item key="3" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </div>
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
          {selectedNav === "2" && (
            <div>
              <div className="flex bg-[#F2F8FF]">
                <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
                  Name
                </div>
                <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
                  Delay Time
                </div>
                <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
                  Resolution
                </div>
                <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
                  Created At
                </div>
                <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
                  Update dAt
                </div>
              </div>
              {data ? (
                data?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row"
                      onClick={() => {
                        setState((pre) => ({
                          ...pre,
                          isModalOpen: true,
                        }));
                        formik.setValues({
                          id: item._id,
                          name: item.name,
                          delayTime: item.delayTime,
                          resolution: item.resolution,
                        });
                      }}
                      style={{
                        borderBottom: " 0.5px solid #407fdd",
                        cursor: "pointer",
                      }}
                    >
                      <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                        {item.name}
                      </div>
                      <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                        {item.delayTime}s
                      </div>
                      <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                        {item.resolution}
                      </div>
                      <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                        {format(
                          new Date(item.createdAt),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </div>
                      <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                        {format(
                          new Date(item.updatedAt),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center mt-8 font-bold text-[14px]">
                  {" "}
                  No device
                </div>
              )}
            </div>
          )}
        </Content>
      </Layout>
      <Modal
        title="Edit Device"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <p className="text-4 text-[#407fdd] font-medium mb-1">Name</p>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="name"
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Delay Time</p>
            <input
              name="delayTime"
              type="number"
              min={0}
              onChange={formik.handleChange}
              value={formik.values.delayTime}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="delayTime"
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Resolution</p>
            <input
              name="resolution"
              type="number"
              min={0}
              onChange={formik.handleChange}
              value={formik.values.resolution}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="resolution"
            />
          </div>
        </form>
      </Modal>
    </Layout>
  );
};
export default App;
