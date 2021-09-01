import axios from "axios";

export default {
  getData: function() {
    return  axios.get("http://localhost:9000/customers")
    }
};