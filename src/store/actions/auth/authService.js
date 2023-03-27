// API
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

//* Validar email+
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

/*
- =================================
-         Registrar usuario
- =================================
*/
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  return response.data;
};

/*
- =================================
-         Iniciar Sesión
- =================================
*/
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  return response.data;
};

/*
- =================================
-         Cerrar Sesión
- =================================
*/
const logout = async () => {
  const response = await axios.get(API_URL + "logout");

  return response.data.message;
};

/*
- =================================
-   Estado del inicio de Sesión
- =================================
*/
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");

  return response.data;
};

/*
- =================================
-       Perfil del usuario
- =================================
*/
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");

  return response.data;
};

/*
- =================================
-   Enviar email de verificación
- =================================
*/
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");

  return response.data.message;
};

/*
- =================================
-   Verificar usuario
- =================================
*/
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

/*
- =================================
-       Cambiar Contraseña
- =================================
*/
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

/*
- =================================
-       Olvido Contraseña
- =================================
*/
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

/*
- =================================
-       Resetear Contraseña
- =================================
*/
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

/*
- =================================
-       listar usuarios
- =================================
*/
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");

  return response.data;
};

/*
- =================================
-       eliminar usuario
- =================================
*/
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);

  return response.data;
};

/*
- =================================
-   Enviar Código inicio de sesión
- =================================
*/
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data;
};

/*
- =================================
-   Ingresar con código
- =================================
*/
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  sendLoginCode,
  loginWithCode,
  deleteUser
};

export default authService;