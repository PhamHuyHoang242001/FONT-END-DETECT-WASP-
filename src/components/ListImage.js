import { Button, Image, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getData } from "../fetchMethod";
import { twMerge } from "tailwind-merge";
function ListImage(props) {
  const listCount = [
    {
      value: "6",
      label: "6 image",
    },
    {
      value: "12",
      label: "12 image",
    },
    {
      value: "24",
      label: "24 image",
    },
  ];
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState("12");
  const getData1 = async () => {
    const res = await getData(
      `http://103.176.178.96:8000/api/v1/image/${props.deviceId}?${
        "imageCount=" + imageCount
      }`
    );
    setImages(res);
  };
  useEffect(() => {
    getData1();
  }, [imageCount]);
  return (
    <div>
      <div className="w-full  flex justify-between ">
        <div className="flex gap-4 flex-row">
          <Button
            className="bg-blue-700 text-white w-[100px] flex flex-row  justify-center items-center mb-3"
            onClick={props.onBack}
          >
            <ArrowLeftOutlined />
            {"  "}Back
          </Button>
          <div className="flex flex-row gap-2 items-start">
            <span className="text-2xl font-medium">Device :</span>
            <span className="font-bold text-2xl text-blue-700">
              {props.deviceName}
            </span>
          </div>
        </div>
        <Select
          size="middle"
          defaultValue=""
          value={imageCount}
          onChange={(e) => {
            setImageCount(e);
          }}
          style={{
            width: 200,
            color: "black",
            marginLeft: "8px",
          }}
          options={listCount}
        />
      </div>
      <div
        className={twMerge(
          "grid  mt-4",
          imageCount === "6"
            ? "grid-cols-3 gap-3"
            : imageCount === "12"
            ? "grid-cols-4 gap-2"
            : "grid-cols-6 gap-1"
        )}
      >
        {images?.map((item, index) => {
          return (
            <div key={index}>
              <Image
                src={`http://103.176.178.96:8000/api/v1/photo/${item._id}`}
                alt=""
              ></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ListImage;
