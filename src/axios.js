const axios = require("axios");

const { serverUrl } = require("./config");


const headers = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    authorization: `Bearer ${token}`,
  };
};

const testReq = () => {
  return axios.get(`${serverUrl}/`, { headers: headers() });
};

const postForm = (data) => {
  return axios.post(`${serverUrl}/form`, data, { headers: headers() });
};

const getForm = (id) => {
  return axios.get(`${serverUrl}/form/${id}`);
};

const deleteForm = (id) => {
  return axios.delete(`${serverUrl}/form/${id}`, { headers: headers() });
};

const getForms = () => {
  return axios.get(`${serverUrl}/form/`, { headers: headers() });
};

const enableForm = (id, action) => {
  return axios.post(
    `${serverUrl}/form/${id}/enable`,
    { action },
    { headers: headers() }
  );
};

const getResponses = (id) => {
  return axios.get(`${serverUrl}/form/${id}/response`, {
    headers: headers(),
  });
};

const postResponse = (id, data) => {
  return axios.post(`${serverUrl}/form/${id}/response`, { responses: data });
};

const loginUser = (data) => {
  return axios.post(`${serverUrl}/user/login`, data);
};

const registerUser = (data) => {
  return axios.post(`${serverUrl}/user/register`, data);
};

module.exports = {
  postForm,
  getForm,
  deleteForm,
  getForms,
  enableForm,
  loginUser,
  registerUser,
  getResponses,
  postResponse,
  testReq,
};
