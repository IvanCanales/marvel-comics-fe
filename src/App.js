import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import MainNavigation from "./navigation/MainNavigation";
import DefaultLayout from "./layouts/default";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <DefaultLayout>
          <MainNavigation />
        </DefaultLayout>
      </Router>
    </Provider>
  );
};

export default App;
