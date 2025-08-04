import React from "react";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import Logo from "../../../../public/black_logo.svg";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { useLogin } from "@/api/services/userServices";
import Image from "next/image";
import { getAppLogo } from "@/utils/app";

const Login = () => {
  const { showMessage } = useToast();
  const [cookies, setCookies] = new useCookies(["authentication_token"]);
  const { mutate: login, isPending } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    const password = e.target.password.value;

    const payload = {
      username,
      password,
    };

    login(payload, {
      onSuccess: (data) => {
        const { token, user } = data?.data?.data || {};
        const decoded = jwtDecode(token);
        const expDate = new Date(decoded.exp * 1000);

        if (user?.role !== "cashier") {
          setCookies("authentication_token", token, {
            path: "/",
            expires: expDate,
          });
        } else {
          showMessage("Invalid username or password", { type: ERROR });
        }
      },
      onError: (error) => {
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  const appLogo = getAppLogo();

  return (
    <div className=" w-screen h-[100svh] flex flex-col items-center justify-center font-urbanist ">
      <div className="w-full max-w-[30rem] bg-white rounded-2xl md:mt-4 flex flex-col px-8 pt-20 md:p-8 h-full md:h-auto">
        <div className="flex items-center justify-center w-full mb-10">
          <Image
            src={appLogo.path}
            width={appLogo.authWidth}
            height={appLogo.authHeight}
            alt="logo"
          />
        </div>
        <p className="font-urbanist-black  text-[22px]">Login</p>
        <p className="mb-2 text-slate-400">
          Enter your credentials in the form below.
        </p>
        <form
          className="flex flex-col gap-2 w-full text-sm"
          onSubmit={handleLogin}
        >
          <AppInput
            type="text"
            name="username"
            label={"Username"}
            placeholder={"Enter your username"}
          />
          <AppInput
            type="password"
            name="password"
            placeholder="Enter your password"
            label={"Password"}
            required
          />

          <AppButton type="submit" loading={isPending} className={"mt-3"}>
            Login
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
