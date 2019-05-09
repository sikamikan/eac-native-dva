//import { getUserInformation } from "../services/api";
import { routerRedux } from "dva/router";
import getData from "../services/api";

export default {
  namespace: "user",
  state: {},
  effects: {
    *login(action, { put }) {
      yield put(routerRedux.push({ pathname: "/home" }));
    },
    *fetchData(action, { call }) {
      const response = yield call(getData);
      yield put({
        type: "saveData",
        payload: response
      });
    }
  },
  reducers: {
    saveData(state, action) {
      console.log("reducer", action.payload);
      return {
        ...state,
        userInformation: action.payload
      };
    }
  },
  subscriptions: {
    // You can use history object in subscriptions.
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === "/home") {
          alert("logged in");
        }
      });
    }
  }
};
