import React, { useEffect, useState } from "react";
import { getData, updateData } from "../fetchMethod";
import debounce from "lodash.debounce";
import Search from "antd/es/transfer/search";
import { Button, Dropdown, Image, Modal, Pagination } from "antd";
import {
  BugOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EmptyImage from "../assets/images/empty.png";
import { useFormik } from "formik";
import { useCallback } from "react";

function ListUser() {
  const [userData, setUserData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [state, setState] = useState({
    count: null,
    page_size: 2,
    page: 1,
  });
  const { count, page, page_size } = state;
  const getAllUser = async () => {
    try {
      const response = await getData(
        `http://103.176.178.96:8000/api/v1/user/?${
          searchValue ? "searchText=" + searchValue : ""
        }${page_size ? "&pageSize=" + page_size : ""}${
          page ? "&page=" + page : ""
        }`
      );
      // Xử lý kết quả trả về trước khi set cho state
      setUserData(response?.results);
      setState((pre) => ({
        ...pre,
        page: response?.page,
        count: response?.count,
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const EditProfileUser = async (data) => {
    try {
      const response = await updateData(
        `http://103.176.178.96:8000/api/v1/user/${data.id}?name=${data.name}&phone=${data.phone}&address=${data.address}`
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, [searchValue]);
  const onChange = (page1) => {
    setState((pre) => ({
      ...pre,
      page: page1,
    }));
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      phone: "",
      address: "",
    },
    onSubmit: (data) => {
      EditProfileUser(data);
      getAllUser();
    },
  });
  const handleOk = () => {
    formik.handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk1 = () => {
    console.log(deleteUserId);
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const items = [
    {
      icon: <UserSwitchOutlined />,
      key: "1",
      label: "Sign in under user this account",
    },
    {
      icon: <BugOutlined />,
      key: "2",
      label: "Show devices",
    },
    {
      icon: <EditOutlined />,
      key: "3",
      label: "Edit profile",
    },
    {
      key: "4",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];
  const updateSearchValue = useCallback(
    debounce((event) => {
      setSearchValue(event);
      setState((pre) => ({
        ...pre,
        page: 1,
      }));
    }, 500),
    []
  );
  const itemRender = (_, type) => {
    if (type === "prev") {
      return (
        <a
          className="mr-3"
          style={{
            fontSize: 12,
          }}
        >
          Previous
        </a>
      );
    }
    if (type === "next") {
      return (
        <a
          className=" ml-3"
          style={{
            fontSize: 12,
          }}
        >
          Next
        </a>
      );
    }
  };
  return (
    <div>
      <div className="w-full flex flex-row">
        <div className="w-1/2 ">
          {/* <Button
            onClick={() => {
              formik.setValues({
                name: "",
                email: "",
                password: "",
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
            Add new user
          </Button> */}
        </div>
        <div className="w-1/2">
          <Search
            placeholder="Search name / phone"
            enterButton="Search"
            size="large"
            allowClear
            onChange={(e) => {
              updateSearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex bg-[#F2F8FF] mt-3">
        <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
          Name
        </div>
        <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
          Phone
        </div>
        <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
          Email
        </div>
        <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
          Address
        </div>
        <div className="w-1/5 font-semibold text-black h-[3.75rem] flex justify-center items-center">
          List Farms
        </div>
      </div>
      <div>
        {userData?.length > 0 ? (
          userData?.map((item, index) => (
            <div key={index} className="flex flex-row">
              <div className="flex items-center">
                <Dropdown
                  menu={{
                    items,
                    style: { padding: "8px" },
                    onClick: (e) => {
                      switch (e.key) {
                        case "1":
                          break;
                        case "2":
                          break;
                        case "3":
                          formik.setValues({
                            id: item._id,
                            name: item.name,
                            phone: item.phone,
                            address: item.address ? item.address : "",
                          });
                          setIsModalOpen(true);
                          break;
                        case "4":
                          setDeleteUserId(item._id);
                          setIsModalOpen1(true);
                          break;
                        default:
                          break;
                      }
                    },
                  }}
                  placement={"topLeft"}
                >
                  <Button
                    type={"text"}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="charm:menu-kebab">
                          <g id="Group">
                            <path
                              id="Vector"
                              d="M12 4.875C12.6213 4.875 13.125 4.37132 13.125 3.75C13.125 3.12868 12.6213 2.625 12 2.625C11.3787 2.625 10.875 3.12868 10.875 3.75C10.875 4.37132 11.3787 4.875 12 4.875Z"
                              stroke="black"
                              strokeWidth="2.34375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              id="Vector_2"
                              d="M12 13.125C12.6213 13.125 13.125 12.6213 13.125 12C13.125 11.3787 12.6213 10.875 12 10.875C11.3787 10.875 10.875 11.3787 10.875 12C10.875 12.6213 11.3787 13.125 12 13.125Z"
                              stroke="black"
                              strokeWidth="2.34375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              id="Vector_3"
                              d="M12 21.375C12.6213 21.375 13.125 20.8713 13.125 20.25C13.125 19.6287 12.6213 19.125 12 19.125C11.3787 19.125 10.875 19.6287 10.875 20.25C10.875 20.8713 11.3787 21.375 12 21.375Z"
                              stroke="black"
                              strokeWidth="2.34375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </g>
                      </svg>
                    }
                  />
                </Dropdown>
              </div>
              <div className="w-1/5 font-medium text-black h-[3.75rem] flex justify-center items-center">
                {item.name}
              </div>
              <div className="w-1/5 font-medium text-black h-[3.75rem] flex justify-center items-center">
                {item.phone}
              </div>
              <div className="w-1/5 font-medium text-black h-[3.75rem] flex justify-center items-center">
                {item.email}
              </div>
              <div className="w-1/5 font-medium text-black h-[3.75rem] flex justify-center items-center">
                {item.address ? item.address : "none"}
              </div>
              <div className="w-1/5  font-medium text-black h-[3.75rem] flex justify-center items-center">
                Farm1, Farm 2, Farm 3, ...
              </div>
            </div>
          ))
        ) : (
          <div className="relative" style={{ paddingTop: "10%" }}>
            <div className="text-center">
              <Image src={EmptyImage} width={140} height={140} alt="empty" />
              <p className="font-medium text-xl">No accounts found</p>
            </div>
          </div>
        )}
      </div>
      {userData?.length !== 0 && (
        <div className="is-flex is-justify-content-center is-align-content-center mt-2 staff_leave_footer">
          <Pagination
            showSizeChanger={false}
            itemRender={itemRender}
            defaultPageSize={4}
            onChange={onChange}
            defaultCurrent={1}
            total={count}
            current={page}
          />
        </div>
      )}
      <Modal
        title="Edit profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col justify-start">
            <p className="text-4 text-[#407fdd] font-medium mb-1">Name</p>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="custom_input_search px-2 outline-none mb-4"
              maxLength={50}
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Phone</p>
            <input
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="custom_input_search px-2 outline-none mb-4"
              maxLength={20}
            />
            <p className="text-4 text-[#407fdd] font-medium mb-1">Address</p>
            <input
              name="address"
              type="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="custom_input_search px-2 outline-none mb-4"
              maxLength={100}
            />
          </div>
        </form>
      </Modal>
      <Modal
        title="Delete user"
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <div>Are you sure you want to delete this user?</div>
      </Modal>
    </div>
  );
}

export default ListUser;
