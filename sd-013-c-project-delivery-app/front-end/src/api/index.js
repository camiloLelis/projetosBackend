import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export function register(body) {
  const data = axios
    .post(`${baseUrl}/user`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function registerByAdmin(body, token) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios
    .post(`${baseUrl}/admin/user`, body, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function createSale(body, token) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios
    .post(`${baseUrl}/sale`, body, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function login(body) {
  const data = axios
    .post(`${baseUrl}/login`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function getAllProducts(token) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.get(`${baseUrl}/product`, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function getUsers(token) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.get(`${baseUrl}/user`, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return data;
}

export function deleteUser(token, id) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.delete(`${baseUrl}/user/${id}`, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function getAllSales(token, id) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.get(`${baseUrl}/sale/user/${id}`, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function getSaleById(token, id) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.get(`${baseUrl}/sale/${id}`, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function editSaleStatusById(token, status, id) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = axios.put(`${baseUrl}/sale/${id}`, { status }, config)
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}
