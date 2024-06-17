import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useFormik } from "formik";
import EmptyImage from "../assets/images/empty.png";
import * as Yup from "yup";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { getData, updateData, deleteData, createData } from "../fetchMethod";
import { Button, Modal, Image } from "antd";
import { twMerge } from "tailwind-merge";
// import { useNavigate } from "react-router-dom";
function ListFarm(props) {
  const [state, setState] = useState({
    isModalOpen: false,
    dataFarm: [],
  });
  const { isModalOpen, dataFarm } = state;
  const handleOk = () => {
    formik.handleSubmit();
    if (!formik.errors.name) {
      setState((pre) => ({
        ...pre,
        isModalOpen: false,
      }));
      formik.setFormikState((prev) => ({
        ...prev,
        submitCount: 0,
      }));
    }
  };
  const DeleteFarm = async (farmId) => {
    try {
      const response = await deleteData(
        `http://103.176.178.96:8000/api/v1/farm/${farmId}`
      );
      getData1();
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleCancel = () => {
    setState((pre) => ({
      ...pre,
      isModalOpen: false,
    }));
    formik.setFormikState((prev) => ({
      ...prev,
      submitCount: 0,
    }));
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("First name is required"),
    }),
    onSubmit: (data) => {
      if (data.id) {
        updateFarm(data);
      } else {
        AddNewFarm(data);
      }
    },
  });
  const updateFarm = async (data) => {
    const x = await updateData(
      `http://103.176.178.96:8000/api/v1/farm/${data.id}`,
      {
        name: data.name,
      }
    );
    console.log(x);
    getData1();
  };
  const AddNewFarm = async (data) => {
    const x = await createData(`http://103.176.178.96:8000/api/v1/farm`, {
      name: data.name,
      ownerID: props.userId,
    });
    console.log(x);
    getData1();
  };
  const getData1 = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/farm/user/${props.userId}`
    );
    setState((pre) => ({
      ...pre,
      dataFarm: res,
    }));
  };

  useEffect(() => {
    getData1();
  }, []);
  return (
    <div>
      <div className="w-full flex justify-between">
        <Button
          className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
          onClick={props.onBack}
        >
          <ArrowLeftOutlined />
          {"  "}Back
        </Button>

        <Button
          onClick={() => {
            setState((pre) => ({
              ...pre,
              isModalOpen: true,
            }));
            formik.setValues({
              id: "",
              name: "",
            });
          }}
          className="bg-blue-700 text-white w-[150px] flex flex-row "
        >
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
          Add new farm
        </Button>
      </div>
      <div className="flex bg-[#F2F8FF]">
        <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Name
        </div>
        <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Number Of Device
        </div>
        <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Created At
        </div>
        <div className="w-1/5 font-bold text-black h-[3.75rem] flex justify-center items-center">
          Update dAt
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
              <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                {item.name}
              </div>
              <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                {item.numberDevices}
              </div>
              <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </div>
              <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
                {format(new Date(item.updatedAt), "dd/MM/yyyy HH:mm:ss")}
              </div>
              <div className="w-1/5 flex justify-center items-center gap-2">
                <Button
                  onClick={() => {
                    props?.showDevices(item._id, dataFarm);
                  }}
                  className="bg-blue-700 text-white w-[80px] flex flex-row  justify-center items-center "
                >
                  <EyeOutlined /> Show
                </Button>
                <Button
                  onClick={() => {
                    setState((pre) => ({
                      ...pre,
                      isModalOpen: true,
                    }));
                    formik.setValues({
                      id: item._id,
                      name: item.name,
                    });
                  }}
                  className="bg-blue-700 text-white w-[80px] flex flex-row  justify-center items-center "
                >
                  <EditOutlined />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    DeleteFarm(item._id);
                  }}
                  className="bg-blue-700 text-white w-[80px] flex flex-row  justify-center items-center "
                >
                  <DeleteOutlined />
                  Delete
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
        title={formik.values.id ? "Edit Farm" : "Add New Farm"}
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
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={twMerge("custom_input_search px-2 outline-none mb-4")}
              style={{
                borderColor:
                  formik.submitCount > 0 && formik.errors.name && "red",
              }}
              placeholder="name"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
export default ListFarm;
