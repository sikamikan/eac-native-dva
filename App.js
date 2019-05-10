import React from "react";
import dva, { connect } from "dva";
import { routerRedux } from "dva/router";
import { createMemoryHistory as createHistory } from "history";
import { Router, Route, Switch } from "dva/router";

import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/HomePage";

import user from "./src/models/user";
import map from "./src/models/map";

// DVAJS original webpage
//https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli
//https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91
//
//copie este ejemplo
//https://github.com/DoubeBlue/react-native-dva

// 1 initialize
// https://github.com/dvajs/dva/blob/master/docs/API.md
const app = dva({
  initialState: {},
  //models: [user],  << para usar esto tengo q poner un :
  //    C:\src2\!reactNativeTests\react-native-dva\src\utils\dva.js
  //    C:\src2\!reactNativeTests\react-native-dva\src\App.js
  history: createHistory(), // Trick !!
  //onAction: [routerMiddleware],
  onError(e, dispatch) {
    console.log("e", e, dispatch);
  }
});

//2 add models
app.model(user);
app.model(map);

// app.model({
//   namespace: "user",
//   state: {},
//   reducers: {},
//   effects: {
//     *login(action, { put }) {
//       yield put(routerRedux.push({ pathname: "/home" }));
//     }
//   },
//   subscriptions: {
//     // You can use history object in subscriptions.
//     setup({ history, dispatch }) {
//       history.listen(({ pathname }) => {
//         if (pathname === "/home") {
//           alert("logged in");
//         }
//       });
//     }
//   }
// });

app.router(({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/home" exact component={HomePage} />
    </Switch>
  </Router>
));

const App = app.start();

export default App;
