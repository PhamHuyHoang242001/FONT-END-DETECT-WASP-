import React from "react";
import { Button, Form, Input, notification } from "antd";
import bg1 from "../assets/images/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { createData } from "../fetchMethod";
const SignIn = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const openNotificationWithIcon = (mess) => {
    api.error({
      message: <div className="text-red-700">ERROR</div>,
      description: mess,
    });
  };
  const onFinish = async (values) => {
    try {
      const x = await createData(`http://103.176.178.96:8000/api/v1/signin`, {
        phone: values.email,
        password: values.password,
      });
      if (x?.user && x?.user?.role === 1) {
        localStorage.setItem("userRole", x?.user?.role);
        navigate("/");
        window.location.reload();
      } else {
        openNotificationWithIcon("Account has no permissions.");
        console.log(x);
      }
    } catch (error) {
      console.log(error);

      openNotificationWithIcon("Account information is incorrect.");
    }
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
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="px-16 py-8 bg-white w-1/3   mx-auto "
        style={{
          borderRadius: "10px",
        }}
      >
        <div className="text-[26px] font-bold text-black text-center pb-6">
          Sign in
        </div>
        <Form.Item
          label="Email"
          name="email"
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

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

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
            Login
          </Button>
        </Form.Item>

        {/* <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link
            className="text-[#407fdd] font-semibold mr-10 cursor-pointer"
            to="/signup"
          >
            Create Account
          </Link>
        </Form.Item> */}
      </Form>
    </div>
  );
};
export default SignIn;
