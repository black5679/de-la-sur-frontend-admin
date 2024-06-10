import jwtDecode from "jwt-decode";
import axios from "axios";

import config from "../../config";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;
// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;

    if (error && error.response && error.response.status === 404) {
      // window.location.href = '/not-found';
    } else if (error && error.response && error.response.status === 403) {
      window.location.href = "/access-denied";
    } else {
      // switch (error.response.status) {
      //   case 401:
      //     message = "Invalid credentials";
      //     break;
      //   case 403:
      //     message = "Access Forbidden";
      //     break;
      //   case 404:
      //     message = "Sorry! the data you are looking for could not be found";
      //     break;
      //   default: {
      //     message =
      //       error.response && error.response.data
      //         ? error.response.data["message"]
      //         : error.message || error;
      //   }
      // }
      message =
      error.response && error.response.data
        ? error.response.data["message"] || error.response.data["title"]
        : error.message || error || "Ocurrio un error";
      return Promise.reject(message);
    }
  }
);

const AUTH_SESSION_KEY = "delasur_token";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
  if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  else delete axios.defaults.headers.common["Authorization"];
};

const getUserFromCookie = (): string | null => {
  const token : string | null = sessionStorage.getItem(AUTH_SESSION_KEY);
  return token;
};
class APICore {
  /**
   * Fetches data from given url
   */
  get = (url: string, params: any) => {
    let response;
    if (params) {
      let queryString = params
        ? Object.keys(params)
            .filter(key => typeof params[key] === 'boolean' ? (params[key] !== null && params[key] !== undefined) : params[key] )
            .map((key) => `${key}=${params[key]}`)
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getFile = (url: string, params: any) => {
    let response;
    if (params) {
      let queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls: string, params: any) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = (url: string, data: any) => {
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };

  isUserAuthenticated = () => {
    const token = this.getLoggedInUser();

    if (!token) {
      return false;
    }
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  setLoggedInUser = (token: string | null) => {
    if (token)
      sessionStorage.setItem(AUTH_SESSION_KEY, token);
    else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };
  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromCookie();
  };

  setUserInSession = () => {
    const token = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (token) {
      this.setLoggedInUser(token);
    }
  };
}

/*
Check if token available in session
*/
const token = getUserFromCookie();
if (token) {
    setAuthorization(token);
}

export { APICore, setAuthorization };
