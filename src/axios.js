const axios = require("axios");

const { baseUrl } = require("./config");

const headers = {
  authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
};

const testReq = () => {
  return axios.get(`${baseUrl}/`, { headers });
};

const postForm = (data) => {
  return axios.post(`${baseUrl}/form`, data, { headers });
};

const getForm = (id) => {
  return axios.get(`${baseUrl}/form?id=${id}`);
};

const loginUser = (data) => {
  return axios.post(`${baseUrl}/user/login`, data);
};

const registerUser = (data) => {
  return axios.post(`${baseUrl}/user/register`, data);
};

module.exports = { postForm, getForm, loginUser, registerUser, testReq };
