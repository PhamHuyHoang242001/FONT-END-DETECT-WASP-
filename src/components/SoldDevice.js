import { Button, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { getData, updateData } from "../fetchMethod";

const SoldDevice = () => {
  const [state, setState] = useState({
    active: false,
    userID: "",
    deviceID: "",
    ListDevice: [],
    ListUser: [],
  });
  const { active, userID, deviceID, ListDevice, ListUser } = state;
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Success",
      description: "You have successfully added the device to the user.",
    });
  };
  const getData1 = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/camdevice/?pagesize=100`
    );
    const x = res.results?.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });
    const res1 = await getData(
      `http://103.176.178.96:8000/api/v1/user/?pagesize=50`
    );
    const y = res1.results?.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });
    setState((pre) => ({
      ...pre,
      ListDevice: x,
      ListUser: y,
      deviceID: x[0]?.value,
      userID: y[0]?.value,
    }));
  };
  const updateDevice = async () => {
    try {
      const x = await updateData(
        `http://103.176.178.96:8000/api/v1/camdevice/${deviceID}`,
        {
          userID: userID,
        }
      );
      getData1();
      console.log(x);
      openNotificationWithIcon("success");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData1();
  }, []);
  return (
    <div>
      {contextHolder}
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => {
            setState((pre) => ({
              ...pre,
              active: !active,
            }));
          }}
          className={twMerge(
            " text-white w-[150px] flex flex-row justify-center  items-center",
            active ? "bg-red-700" : "bg-blue-700"
          )}
        >
          {active ? (
            <DeleteOutlined />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4.375V15.625M15.625 10H4.375"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {active ? "Cancell" : "New Trade"}
        </Button>
        {active && (
          <Button
            onClick={updateDevice}
            className="bg-green-700 text-white w-[150px] flex flex-row justify-center  items-center"
          >
            <PlusCircleOutlined />

            {"Submit"}
          </Button>
        )}
      </div>
      {active && (
        <div className="flex flex-wrap gap-4 justify-center items-center mt-6 bg-slate-100 h-20 w-3/4 mx-auto rounded-xl">
          <Select
            size="middle"
            value={userID}
            onChange={(e) => {
              console.log(e);
              setState((pre) => ({
                ...pre,
                userID: e,
              }));
            }}
            style={{
              width: 300,
              color: "black",
              marginLeft: "8px",
            }}
            options={ListUser}
          />
          <SwapOutlined />
          <Select
            size="middle"
            value={deviceID}
            onChange={(e) => {
              console.log(e);
              setState((pre) => ({
                ...pre,
                deviceID: e,
              }));
            }}
            style={{
              width: 300,
              color: "black",
              marginLeft: "8px",
            }}
            options={ListDevice}
          />
        </div>
      )}
    </div>
  );
};
export default SoldDevice;
