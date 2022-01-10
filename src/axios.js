const axios = require("axios");

const { serverUrl } = require("./config");

const headers = {
  authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
};

const testReq = () => {
  return axios.get(`${serverUrl}/`, { headers });
};

const postForm = (data) => {
  return axios.post(`${serverUrl}/form`, data, { headers });
};

const getForm = (id) => {
  return axios.get(`${serverUrl}/form/${id}`);
};

const getForms = (id) => {
  return axios.get(`${serverUrl}/form/`, { headers });
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
  getForms,
  loginUser,
  registerUser,
  postResponse,
  testReq,
};
