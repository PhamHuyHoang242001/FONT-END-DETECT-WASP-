import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "../index.css";
import { useFormik } from "formik";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { getData, updateData, createData, deleteData } from "../fetchMethod";
import EmptyImage from "../assets/images/empty.png";
import { Button, Image, Modal, Pagination, Select } from "antd";
import Search from "antd/es/transfer/search";
import * as Yup from "yup";

// import { useNavigate } from "react-router-dom";
function ListDevice(props) {
  const statusDevice = [
    {
      value: "all",
      lable: "All",
    },
    {
      value: "sold",
      lable: "Sold",
    },
    {
      value: "available",
      lable: "Available",
    },
  ];
  const [state, setState] = useState({
    isModalOpen: false,
    dataFarm: [],
    listDeviceNotUse: [],
    count: null,
    page_size: 10,
    page: 1,
    searchValue: "",
    status: "all",
    deviceID: "",
  });
  const {
    count,
    page,
    page_size,
    isModalOpen,
    dataFarm,
    listDeviceNotUse,
    searchValue,
    status,
    deviceID,
  } = state;
  const handleOk = () => {
    formik.handleSubmit();
    if (
      !formik.errors.name &&
      !formik.errors.delayTime &&
      !formik.errors.resolution
    ) {
      console.log(formik.errors);
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
  const updateSearchValue = useCallback(
    debounce((event) => {
      setState((pre) => ({
        ...pre,
        page: 1,
        searchValue: event,
      }));
    }, 500),
    []
  );
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      delayTime: "",
      resolution: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("First name is required"),
      delayTime: Yup.string().required("Delay Time is required"),
      resolution: Yup.string().required("Resolution is required"),
    }),
    onSubmit: (data) => {
      if (data.id) {
        updateDevice(data);
      } else {
        addNewDevice(data);
      }
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
  const addNewDevice = async (data) => {
    const x = await createData(`http://103.176.178.96:8000/api/v1/camdevice`, {
      name: data.name,
      delayTime: data.delayTime,
      resolution: data.resolution,
    });
    getData1();
    console.log(x);
  };
  const addDeviceInFarm = async () => {
    if (deviceID !== "") {
      let x = await updateData(
        `http://103.176.178.96:8000/api/v1/camdevice/${deviceID}`,
        {
          farmID: props.farmId,
        }
      );
      console.log(x);
      setState((pre) => ({
        ...pre,
        deviceID: "",
      }));
      getData1();
      getListDeviceNotUse();
    }
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
      const res = await getData(
        `http://103.176.178.96:8000/api/v1/camdevice/?${
          searchValue ? "searchText=" + searchValue : ""
        }${page_size ? "&pagesize=" + page_size : ""}${
          page ? "&page=" + page : ""
        }${status ? "&status=" + status : ""}`
      );
      setState((pre) => ({
        ...pre,
        dataFarm: res.results,
        page: res?.page,
        count: res?.count,
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
    if (props.userId) {
      getListDeviceNotUse();
    }
  }, [page, searchValue, status]);
  const onChange = (page1) => {
    setState((pre) => ({
      ...pre,
      page: page1,
    }));
  };
  return (
    <div>
      {props.onBack ? (
        <div className="flex flex-row justify-between">
          <Button
            className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
            onClick={props.onBack}
          >
            <ArrowLeftOutlined />
            {"  "}Back
          </Button>
          <div className="text-black font-medium flex flex-row gap-3 items-center">
            Add Device :
            <Select
              size="middle"
              defaultValue=""
              value={deviceID}
              onChange={(e) => {
                setState((pre) => ({
                  ...pre,
                  deviceID: e,
                }));
              }}
              style={{
                width: 200,
                color: "black",
                marginLeft: "8px",
              }}
              options={listDeviceNotUse}
            />
            <Button
              onClick={addDeviceInFarm}
              className="bg-green-700 text-white w-[150px] flex flex-row justify-center  items-center w-20"
            >
              <PlusCircleOutlined />

              {"Add"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-row">
          <div className="w-1/2 ">
            <Button
              onClick={() => {
                setState((pre) => ({
                  ...pre,
                  isModalOpen: true,
                }));
                formik.setValues({
                  id: "",
                  name: "",
                  delayTime: "",
                  resolution: "",
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
              Add new Device
            </Button>
          </div>
          <div className="w-1/2 flex flex-row gap-2">
            <Search
              placeholder="Search name"
              enterButton="Search"
              size="large"
              allowClear
              onChange={(e) => {
                updateSearchValue(e.target.value);
              }}
            />
            <Select
              size="middle"
              value={status}
              onChange={(e) => {
                setState((pre) => ({
                  ...pre,
                  status: e,
                  page: 1,
                }));
              }}
              style={{
                width: 200,
                color: "black",
                marginLeft: "8px",
              }}
              options={statusDevice}
            />
          </div>
        </div>
      )}
      <div className="flex bg-[#F2F8FF] mt-3">
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
                style={{ color: item.status ? "red" : "#87FF74" }}
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
                ) : item.status ? (
                  "Sold"
                ) : (
                  "Available"
                )}
              </div>
              <div
                className="w-1/6 font-semibold h-[3.75rem] flex gap-2 justify-center  items-center"
                style={{ color: "red" }}
              >
                {props.farmId && (
                  <Button
                    onClick={() => {
                      props.onShow(item._id, item.name);
                    }}
                    className="bg-blue-700 text-white w-[90px] flex flex-row  justify-center items-center "
                  >
                    <FileImageOutlined />
                    Show
                  </Button>
                )}
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
      {dataFarm?.length !== 0 && (
        <div className="flex mt-2 ">
          <Pagination
            showSizeChanger={false}
            defaultPageSize={page_size}
            onChange={onChange}
            defaultCurrent={1}
            total={count}
            current={page}
            className="mx-auto"
          />
        </div>
      )}
      <Modal
        title={formik.values.id ? "Edit Device" : "Add Device"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <p className="text-4 text-[#407fdd] font-medium mb-1">Name</p>
            <input
              name="name"
              id="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="name"
              style={{
                borderColor:
                  formik.submitCount > 0 && formik.errors.name && "red",
              }}
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Delay Time</p>
            <input
              name="delayTime"
              id="delayTime"
              type="number"
              min={0}
              onChange={formik.handleChange}
              value={formik.values.delayTime}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="delayTime"
              style={{
                borderColor:
                  formik.submitCount > 0 && formik.errors.delayTime && "red",
              }}
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Resolution</p>
            <input
              name="resolution"
              id="resolution"
              type="number"
              min={0}
              onChange={formik.handleChange}
              value={formik.values.resolution}
              className="custom_input_search px-2 outline-none mb-4"
              placeholder="resolution"
              style={{
                borderColor:
                  formik.submitCount > 0 && formik.errors.resolution && "red",
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
export default ListDevice;
