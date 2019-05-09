import React from "react";
import dva, { connect } from "dva";
import { routerRedux } from "dva/router";
import { createMemoryHistory as createHistory } from "history";

import { Router, Route, Switch } from "dva/router";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage";

import user from "./models/user";
import map from "./models/map";

// DVAJS original webpage
//https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli
//https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91
//
//copie este ejemplo
//https://github.com/DoubeBlue/react-native-dva

// 1 initialize
const app = dva({
  initialState: {},
  //models: [user],
  history: createHistory(), // Trick !!
  //onAction: [routerMiddleware],
  onError(e, dispatch) {
    console.log("e", e);
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
