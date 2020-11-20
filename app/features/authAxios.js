import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  validateStatus: (status) => status < 500,
});

export const apiKey = "AIzaSyCp1b-hd1BhEMdhKcdkYX4sasFAmZzzH-0";

export default instance;
