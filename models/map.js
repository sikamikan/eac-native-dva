//import { getUserInformation } from "../services/api";
import { routerRedux } from "dva/router";

export default {
  namespace: "map",
  state: {},
  effects: {
    *login(action, { put }) {
      yield put(routerRedux.push({ pathname: "/home" }));
    }
  },
  reducers: {},
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
