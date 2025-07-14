import axios from "axios";

const commonApi = async (reqUrl, reqMethod, reqHeaders, reqData) => {
  const axiosConfig = {
    url: reqUrl,
    method: reqMethod,
    headers: reqHeaders || { 'Content-Type': 'application/json' },
    data: reqData,
  };
  // console.log(axiosConfig)
  return await axios(axiosConfig);
};

export default commonApi;
