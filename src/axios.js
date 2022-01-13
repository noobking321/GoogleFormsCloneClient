const axios = require("axios");

const { serverUrl } = require("./config");

const headers = (token) => {
  return {
    authorization: `Bearer ${token}`,
  };
};

const testReq = (token) => {
  return axios.get(`${serverUrl}/`, { headers: headers(token) });
};

const postForm = (data, token) => {
  return axios.post(`${serverUrl}/form`, data, { headers: headers(token) });
};

const getForm = (id) => {
  return axios.get(`${serverUrl}/form/${id}`);
};

const deleteForm = (id, token) => {
  return axios.delete(`${serverUrl}/form/${id}`, { headers: headers(token) });
};

const getForms = (token) => {
  return axios.get(`${serverUrl}/form/`, { headers: headers(token) });
};

const enableForm = (id, action, token) => {
  return axios.post(
    `${serverUrl}/form/${id}/enable`,
    { action },
    { headers: headers(token) }
  );
};

const getResponses = (id, token) => {
  return axios.get(`${serverUrl}/form/${id}/response`, {
    headers: headers(token),
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
