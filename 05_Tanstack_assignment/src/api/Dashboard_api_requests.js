import axios from 'axios';

export const get_user = async () => {
    try {
        const response = await axios.get('https://67eb8197aa794fb3222a7963.mockapi.io/users/users');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; 
    }
};
const API_URL = 'https://67eb8197aa794fb3222a7963.mockapi.io/users/users';

export const add_user = async (newUser) => {
    try {
        const response = await axios.post(API_URL, newUser);
        return response.data; 
    }
    catch (error) {
        throw error;
    }
};
export const delete_user = async (Id) => {
    try{
        const response = await axios.delete(`https://67eb8197aa794fb3222a7963.mockapi.io/users/users/${Id}`);
        // return response.data; 
    }
    catch(error) {
        throw error;
    }
  };

  export const update_user = async (updatedUser) => {
      try {
          const response = await axios.put(`https://67eb8197aa794fb3222a7963.mockapi.io/users/users/${updatedUser.id}`, updatedUser);
          return response.data;
      } catch (error) {
          throw error;
      }
  };
