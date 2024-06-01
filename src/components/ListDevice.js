import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useFormik } from "formik";

import { getData, updateData } from "../fetchMethod";
import { Modal } from "antd";
// import { useNavigate } from "react-router-dom";
function ListDevice() {
  const [state, setState] = useState({
    isModalOpen: false,
    dataFarm: [],
  });
  const { isModalOpen, dataFarm } = state;
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
      getData1();
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
    console.log(x);
  };
  const getData1 = async () => {
    const res = await getData(`http://103.176.178.96:8000/api/v1/camdevice`);
    setState((pre) => ({
      ...pre,
      dataFarm: res.results,
    }));
  };
  useEffect(() => {
    getData1();
  }, []);
  return (
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
      {dataFarm ? (
        dataFarm?.map((item, index) => {
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
                {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </div>
              <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                {format(new Date(item.updatedAt), "dd/MM/yyyy HH:mm:ss")}
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
