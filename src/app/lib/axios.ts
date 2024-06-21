import axios from 'axios';
import { environment } from 'src/environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.baseUrl,
});

export default axiosInstance;
