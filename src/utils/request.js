// import fetch from "dva/fetch";
// import { notification } from "antd";
// import router from "umi/router";
// import auth from "@tmc/auth";
// import hash from "hash.js";

const codeMessage = {
  200: "The server successfully returned the requested data",
  201: "New or modified data is successful",
  202: "A request has entered the background queue (asynchronous task)",
  204: "The data was deleted successfully",
  400: "The request was made with an error and the server did not perform any operations to create or modify data",
  401: "User does not have permission (token, username, password is incorrect)",
  403: "User is authorized, but access is forbidden",
  404: "The request is made for a record that does not exist, and the server does not operate",
  406: "The format of the request is not available",
  410: "The requested resource is permanently deleted and will not be retrieved",
  422: "A validation error occurred when creating an object",
  500: "An error occurred on the server. Please check the server",
  502: "Gateway error",
  503: "The service is unavailable and the server is temporarily overloaded or maintained",
  504: "The gateway timed out"
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // notification.error({
  //   message: `Error: ${response.status}: ${response.url}`,
  //   description: errortext
  // });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    ...option
  };

  //
  // check if user is still logged before proceed.
  // if user is not logged, remove localStorage properties and redirects to user/login page
  //
  // if (!auth.isLoggedIn()) {
  //   auth.logout();
  //   localStorage.removeItem("optemis-authority");
  //   //router.push("/user/login");
  //   return;
  // }

  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : "");
  // const hashcode = hash
  //   .sha256()
  //   .update(fingerprint)
  //   .digest("hex");

  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method.toUpperCase() === "POST" ||
    newOptions.method.toUpperCase() === "PUT" ||
    newOptions.method.toUpperCase() === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers
      };
    }
  }

  return (
    fetch(url, newOptions)
      .then(checkStatus)
      //.then(response => cachedSave(response, hashcode))
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOptions.method === "DELETE" || response.status === 204) {
          return response.text();
        }
        return response.json();
      })
      .catch(e => {
        const status = e.name;
        if (status === 401) {
          // @HACK
          /* eslint-disable no-underscore-dangle */
          window.g_app._store.dispatch({
            type: "login/logout"
          });
          return;
        }
        // environment should not be used
        // if (status === 403) {
        //   router.push("/exception/403");
        //   return;
        // }
        // if (status <= 504 && status >= 500) {
        //   router.push("/exception/500");
        //   return;
        // }
        // if (status >= 404 && status < 422) {
        //   router.push("/exception/404");
        // }
      })
  );
}
