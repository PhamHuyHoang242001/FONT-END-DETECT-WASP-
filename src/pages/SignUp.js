import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import bg1 from "../assets/images/bg1.jpg";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/user/signin");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg1})`,
      }}
      className="bg-black opacity-0.3 w-full  h-screen bg-no-repeat bg-cover pt-[10%]"
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="p-10 bg-white w-1/3   mx-auto "
        style={{
          borderRadius: "10px",
        }}
      >
        <div className="text-[26px] font-bold text-black text-center pb-6">
          Sign Up
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#407fdd] text-white font-semibold "
          >
            Register
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link
            className="text-[#407fdd] font-semibold mr-10 cursor-pointer"
            to="/user/signin"
          >
            Back to login
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
