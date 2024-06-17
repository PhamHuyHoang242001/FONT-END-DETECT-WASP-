import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "../index.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getData, updateData } from "../fetchMethod";
import EmptyImage from "../assets/images/empty.png";
import { Button, Image, Pagination } from "antd";
import Search from "antd/es/transfer/search";
// import { useNavigate } from "react-router-dom";
function ListDeviceAvailable(props) {
  const [state, setState] = useState({
    dataFarm: [],
    count: null,
    page_size: 10,
    page: 1,
    searchValue: "",
  });
  const { count, page, page_size, dataFarm, searchValue } = state;
  console.log(props.userId);
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

  const getData1 = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/camdevice/?${
        searchValue ? "searchText=" + searchValue : ""
      }${page_size ? "&pagesize=" + page_size : ""}${
        page ? "&page=" + page : ""
      }${"&status=available"}`
    );

    setState((pre) => ({
      ...pre,
      dataFarm: res.results,
      page: res?.page,
      count: res?.count,
    }));
  };

  useEffect(() => {
    getData1();
  }, [page, searchValue]);
  const onChange = (page1) => {
    setState((pre) => ({
      ...pre,
      page: page1,
    }));
  };
  return (
    <div>
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex flex-row gap-6 ">
          <Button
            className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
            onClick={props.onBack}
          >
            <ArrowLeftOutlined />
            {"  "}Back
          </Button>
          <span className="font-bold text-2xl text-blue-700">
            {props.userName}
          </span>
        </div>
        <div className="w-1/2 ">
          <Search
            placeholder="Search name"
            enterButton="Search"
            size="middle"
            allowClear
            onChange={(e) => {
              updateSearchValue(e.target.value);
            }}
          />
        </div>
      </div>

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
          Status
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
              <div className="w-4/6 flex">
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
                {item.status ? "Available" : "Sold"}
              </div>
              <div
                className="w-1/6 font-semibold h-[3.75rem] flex justify-center  items-center"
                style={{ color: "red" }}
              >
                <Button
                  onClick={async () => {
                    let x = await updateData(
                      `http://103.176.178.96:8000/api/v1/camdevice/${item._id}`,
                      {
                        userID: props.userId,
                      }
                    );
                    console.log(x);
                    getData1();
                  }}
                  className="bg-blue-700 text-white w-[90px] flex flex-row  justify-center items-center "
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
                  Add to user
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
    </div>
  );
}
export default ListDeviceAvailable;
