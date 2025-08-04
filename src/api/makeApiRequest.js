import { Cookies } from "react-cookie";

const { default: axios } = require("axios");

const makeApiRequest = async (options) => {
  const cookies = new Cookies();
  const token = cookies.get("authentication_token");
  const authorizationHeader = token ? `Bearer ${token}` : "";
  try {
    const response = await axios({
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: authorizationHeader,
        "x-tenant-id": process.env.NEXT_PUBLIC_TENANT_ID,
      },
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      console.log("Token removed by api request!");
      cookies.remove("authentication_token", { path: "/" });
    }
    throw new Error(
      error?.response?.data?.message ||
        "Request Failed, check your connection and try again!"
    );
  }
};

export default makeApiRequest;
