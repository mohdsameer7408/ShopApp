import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://shopapp-81d93.firebaseio.com",
});

export default instance;
