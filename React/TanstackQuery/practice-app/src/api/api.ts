import axios from "axios";

// 사용자 목록 가져오기
export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
};
