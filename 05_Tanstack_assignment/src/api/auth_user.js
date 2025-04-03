import axios from 'axios';

export const Get_user = async(data) => {
    // console.log(data,"456456")
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', { 
        
            username  : data.username,
            password :  data.password

        }, );
        console.log(response);
        const token = response?.data?.accessToken;
        localStorage.setItem("accessToken", token);
    }

    catch(error) {
        return error
       
    }
}
