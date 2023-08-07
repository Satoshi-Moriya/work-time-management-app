import axios from "axios"

export const deleteUser = async (userId: number | null | undefined) => {

  const response = await axios
    .delete(`http://localhost:8080/user/${userId}`)
    .then((response) => {
      return {
        status: response.status,
        data: response.data
      };
    })
    .catch((error) => {
      const errorStatus = error.response ? error.response.status : 500;
      return {
        status: errorStatus,
        data: null
      };
    });

    return response;
}