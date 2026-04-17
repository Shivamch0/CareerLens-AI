import axios from "axios"
import api from "./axios.js"

const registerUser = async () => {
    const res = await axios.post('/users/register' , data);
    return res.data;
}