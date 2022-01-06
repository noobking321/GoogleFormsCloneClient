const axios = require("axios");

const { baseUrl } = require("./config");

const postForm = (data) => {
  return axios
    .post(`${baseUrl}/form`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getForm = (id) => {
  return axios
    .get(`${baseUrl}/form?id=${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = { postForm, getForm };
