import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = await AsyncStorage.getItem('AccessToken');
  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 403) {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const refreshToken = await AsyncStorage.getItem("RefreshToken");

      try {
        const { data, headers } = await axios({
          method: "post",
          url: Config.API_APP_KEY+`/refresh`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Authorization-refresh": "Bearer " + refreshToken,
          },
          data: { accessToken, refreshToken },
        });
        const newAccessToken = headers["authorization"];
        const newRefreshToken = headers["authorization-refresh"];
        AsyncStorage.setItem("AccessToken", newAccessToken);
        AsyncStorage.setItem("RefreshToken", newRefreshToken);
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return await axios(originalRequest);
      } catch (err) {
        console.log(err);
        // localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
