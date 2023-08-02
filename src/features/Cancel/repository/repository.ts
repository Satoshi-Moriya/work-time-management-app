import axios from "axios"

export const deleteUser = async (userId: number | null | undefined) => {

  const response = await axios
    .delete("http://localhost:8080/user", {
      data: {
        userId: userId
      }
    })
    .then((response) => {
      return {
        status: response.status,
        data: response.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status || 500,
        data: null
      };
    });

    return response;
}