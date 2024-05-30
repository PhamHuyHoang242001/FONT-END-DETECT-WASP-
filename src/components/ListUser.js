import React, { useEffect, useState } from "react";
import { getData } from "../fetchMethod";
import Search from "antd/es/transfer/search";
import { Button, Image, Modal } from "antd";
import EmptyImage from "../assets/images/empty.png";
import { useFormik } from "formik";

function ListUser() {
  const [userData, setUserData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getAllUser = async () => {
    try {
      const response = await getData(
        `http://103.176.178.96:8000/api/v1/user/?${
          searchValue ? "searchText=" + searchValue : null
        }`
      );
      // Xử lý kết quả trả về trước khi set cho state
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, [searchValue]);
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      phone: "",
      email: " ",
    },
    onSubmit: (data) => {
      console.log(data);
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
  return (
    <div>
      <div className="w-1/2">
        <Search
          placeholder="input name / phone"
          enterButton="Search"
          size="large"
          allowClear
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
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
          Time
        </div>
      </div>
      <div>
        {userData?.length > 0 ? (
          userData?.map((item, index) => (
            <div key={index} className="flex flex-row">
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
                {item.createdAt}
              </div>
              <div className="w-1/5  flex justify-center items-center gap-2">
                <Button className="bg-blue-700 text-white ">View</Button>
                <Button
                  className="bg-blue-700 text-white "
                  onClick={() => {
                    formik.setValues({
                      id: item._id,
                      name: item.name,
                      phone: item.phone,
                      email: item.email,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button className="bg-blue-700 text-white ">Delete</Button>
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
      <Modal
        title="Edit profile"
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
            <p className="text-4 text-[#407fdd] font-medium mb-1">Email</p>
            <input
              name="email"
              type="email"
              disabled
              onChange={formik.handleChange}
              value={formik.values.email}
              className=" px-2 outline-none mb-4 border-[0.5px] border-gray-400 rounded-sm cursor-not-allowed"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ListUser;
