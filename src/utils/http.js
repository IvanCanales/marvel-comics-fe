import axios from "axios";

export default axios.create({
  baseURL: "https://ec2-3-21-246-173.us-east-2.compute.amazonaws.com:3000/",
  timeout: 10000,
});
