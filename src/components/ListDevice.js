import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useFormik } from "formik";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { getData, updateData, deleteData } from "../fetchMethod";
import EmptyImage from "../assets/images/empty.png";
import { Button, Image, Modal, Select } from "antd";
// import { useNavigate } from "react-router-dom";
function ListDevice(props) {
  const [state, setState] = useState({
    isModalOpen: false,
    dataFarm: [],
    listDeviceNotUse: [],
  });
  const { isModalOpen, dataFarm, listDeviceNotUse } = state;
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
      updateDevice(data);
    },
  });
  const updateDevice = async (data) => {
    const x = await updateData(
      `http://103.176.178.96:8000/api/v1/camdevice/${data.id}`,
      {
        name: data.name,
        delayTime: data.delayTime,
        resolution: data.resolution,
      }
    );
    getData1();
    console.log(x);
  };
  const getData1 = async () => {
    if (props?.farmId) {
      const res = await getData(
        `http://103.176.178.96:8000/api/v1/camdevice/farm/${props.farmId}`
      );
      setState((pre) => ({
        ...pre,
        dataFarm: res,
      }));
    } else {
      const res = await getData(`http://103.176.178.96:8000/api/v1/camdevice`);
      setState((pre) => ({
        ...pre,
        dataFarm: res.results,
      }));
    }
  };
  const getListDeviceNotUse = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/camdevice/user/${props.userId}`
    );
    setState((pre) => ({
      ...pre,
      listDeviceNotUse: res,
    }));
  };
  useEffect(() => {
    getData1();
    getListDeviceNotUse();
  }, []);
  return (
    <div>
      {props.onBack && (
        <div className="flex flex-row justify-between">
          <Button
            className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
            onClick={props.onBack}
          >
            <ArrowLeftOutlined />
            {"  "}Back
          </Button>
          <div className="text-black font-medium">
            Add Device :
            <Select
              size="middle"
              defaultValue=""
              value={listDeviceNotUse[0]?.value}
              onChange={async (e) => {
                let x = await updateData(
                  `http://103.176.178.96:8000/api/v1/camdevice/${e}`,
                  {
                    farmID: props.farmId,
                  }
                );
                console.log(x);
                getData1();
                getListDeviceNotUse();
              }}
              style={{
                width: 200,
                color: "black",
                marginLeft: "8px",
              }}
              options={listDeviceNotUse}
            />
          </div>
        </div>
      )}
      <div className="flex bg-[#F2F8FF]">
        <div className="w-1/6 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Name
        </div>
        <div className="w-1/6 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Delay Time
        </div>
        <div className="w-1/6 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Resolution
        </div>
        <div className="w-1/6 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Created At
        </div>
        <div className="w-1/6 font-bold text-black h-[3.75rem] flex justify-center items-center">
          {props.farmId ? "Farm" : "Status"}
        </div>
      </div>
      {dataFarm?.length > 0 ? (
        dataFarm?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row"
              style={{
                borderBottom: " 0.5px solid #407fdd",
              }}
            >
              <div
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
                className="cursor-pointer w-4/6 flex"
              >
                <div className="w-1/4 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  {item.name}
                </div>
                <div className="w-1/4 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  {item.delayTime}s
                </div>
                <div className="w-1/4 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  {item.resolution}
                </div>
                <div className="w-1/4 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                  {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </div>
              </div>
              <div
                className="w-1/6 font-semibold h-[3.75rem] flex justify-center items-center"
                style={{ color: "red" }}
              >
                {props.farmId ? (
                  <Select
                    size="middle"
                    defaultValue="a1"
                    value={props.farmId}
                    onChange={async (e) => {
                      let x = await updateData(
                        `http://103.176.178.96:8000/api/v1/camdevice/${item._id}`,
                        {
                          farmID: e,
                        }
                      );
                      console.log(x);
                      getData1();
                    }}
                    style={{
                      width: 200,
                      color: "black",
                    }}
                    options={props.listFarms}
                  />
                ) : (
                  "Sold"
                )}
              </div>
              <div
                className="w-1/6 font-semibold h-[3.75rem] flex justify-center  items-center"
                style={{ color: "red" }}
              >
                <Button
                  onClick={async () => {
                    if (props.farmId) {
                      let x = await updateData(
                        `http://103.176.178.96:8000/api/v1/camdevice/${item._id}`,
                        {
                          farmID: null,
                        }
                      );
                      console.log(x);
                      getData1();
                      getListDeviceNotUse();
                    } else {
                      const response = await deleteData(
                        `http://103.176.178.96:8000/api/v1/camdevice/${item._id}`
                      );
                      console.log(response);
                      getData1();
                    }
                  }}
                  className="bg-blue-700 text-white w-[90px] flex flex-row  justify-center items-center "
                >
                  <DeleteOutlined />
                  {props.farmId ? "Remove" : "Delete"}
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center mt-8 font-bold text-[14px]">
          {" "}
          <div className="relative" style={{ paddingTop: "10%" }}>
            <div className="text-center">
              <Image src={EmptyImage} width={140} height={140} alt="empty" />
              <p className="font-medium text-xl">No farms found</p>
            </div>
          </div>
        </div>
      )}
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
    </div>
  );
}
export default ListDevice;
