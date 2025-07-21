import baseUrl from "./base_url";
import commonApi from "./commonApi";

export const registerUser = async (data) => {
  return await commonApi(`${baseUrl}/register`, "POST", "", data);
};

export const loginUser = async (data) => {
  return await commonApi(`${baseUrl}/login`, "POST", "", data);
};

export const addProject = async (data) => {
  const header = {
    Authorization: `token ${sessionStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return await commonApi(`${baseUrl}/addproject`, "POST", header, data);
};
export const userProject = async () => {
  const header = {
    Authorization: `token ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${baseUrl}/userprojects`, "GET", header, '');
};

export const deleteProject = async(id) => {
   const header = {
    Authorization: `token ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
   return await commonApi(`${baseUrl}/deleteproject/${id}`, "DELETE", header, {});
}

export const updateProject = async(id, data, header) => {
   return await commonApi(`${baseUrl}/updateproject/${id}`, "PUT", header, data);
}
export const updateUserProfile = async(data, header) => {
   return await commonApi(`${baseUrl}/updateuser`, "PUT", header, data);
}

export const getAllProjects = async() => {
  return await commonApi(`${baseUrl}/allprojects`, "GET","", "")
}
