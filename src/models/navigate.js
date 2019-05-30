// import { getUserInformation } from "../services/api";
import { routerRedux } from 'dva/router';

// actions
const SET_ROUTE = 'SET_ROUTE';

export default {
  namespace: 'navigate',
  state: {},
  effects: {
    * goToPage(data, { put }) {
      console.log(`navigate.${data.payload}`);
      yield put(routerRedux.push({ pathname: data.payload }));
      yield put({
        type: SET_ROUTE,
        payload: data.payload,
      });
    },
  },
  reducers: {
    [SET_ROUTE](state, action) {
      return {
        ...state,
        route: action.payload,
      };
    },
  },
  subscriptions: {
    // You can use history object in subscriptions.
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/home') {
          alert('logged in2');
          //  dispatch({
          //   type: 'users/fetch',
          // });
        }
      });
    },
  },
};

// Routing by action
// import { routerRedux } from 'dva/router';

// // Inside Effects
// yield put(routerRedux.push('/logout'));

// // Outside Effects
// dispatch(routerRedux.push('/logout'));
