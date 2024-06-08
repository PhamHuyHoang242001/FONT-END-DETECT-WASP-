import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useFormik } from "formik";
import EmptyImage from "../assets/images/empty.png";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { getData, updateData, deleteData } from "../fetchMethod";
import { Button, Modal, Image } from "antd";
// import { useNavigate } from "react-router-dom";
function ListFarm(props) {
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
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    onSubmit: (data) => {
      updateFarm(data);
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
      <div>
        <Button
          className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
          onClick={props.onBack}
        >
          <ArrowLeftOutlined />
          {"  "}Back
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
                {/* {item.numberDevice} */} 2
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
        title="Edit Farm"
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
          </div>
        </form>
      </Modal>
    </div>
  );
}
export default ListFarm;
