// DVAJS original webpage
//https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli
//https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91
//
//copie este ejemplo
//https://github.com/DoubeBlue/react-native-dva
// https://github.com/dvajs/dva/blob/master/docs/API.md

import React from "react";
import dva, { connect } from "dva";
import { routerRedux } from "dva/router";
import { createMemoryHistory as createHistory } from "history";
import { Router, Route, Switch } from "dva/router";

import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/HomePage";

import user from "./src/models/user";
import map from "./src/models/map";

// 1 Initialize
const app = dva({
  initialState: {},
  //models: [user],  << para usar esto tengo q poner un :
  //    C:\src2\!reactNativeTests\react-native-dva\src\utils\dva.js
  //    C:\src2\!reactNativeTests\react-native-dva\src\App.js
  history: createHistory(), // Trick !!
  onError(e, dispatch) {
    console.log("e", e, dispatch);
  }
});

// 2 Plugins
// app.use({});

//3 add models
app.model(user);
app.model(map);

//4 Router
app.router(({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/home" exact component={HomePage} />
    </Switch>
  </Router>
));

//5 start
const App = app.start();

export default App;
