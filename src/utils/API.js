import axios from "axios";

export default {
  getData: function() {
    return  axios.get("https://immense-sea-72965.herokuapp.com/customers")
    }
};