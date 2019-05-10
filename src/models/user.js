//import { getUserInformation } from "../services/api";
import { routerRedux } from "dva/router";
import getData from "../services/api";

//actions
const SET_DATA = "SET_DATA";

export default {
  namespace: "user",
  state: {
    userInformation: null
  },
  effects: {
    *login(_, { put }) {
      yield put(routerRedux.push({ pathname: "/home" }));
    },
    *fetchData(_, { call, put }) {
      console.log("effect");

      const response = yield call(getData);
      yield put({
        type: SET_DATA,
        payload: response
      });
    }
  },
  reducers: {
    [SET_DATA](state, action) {
      console.log("reducer", action.payload.length);
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
          alert("logged in2");
          //  dispatch({
          //   type: 'users/fetch',
          // });
        }
      });
    },
    setup2({ history, dispatch }) {
      history.listen(({ userInformation }) => {
        if (userInformation) {
          alert("cargado");
        }
      });
    }
  }
};

// Routing by action
// import { routerRedux } from 'dva/router';

// // Inside Effects
// yield put(routerRedux.push('/logout'));

// // Outside Effects
// dispatch(routerRedux.push('/logout'));
