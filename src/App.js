import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import HomeNavigation from "./navigation/HomeNavigation";
import DefaultLayout from "./layouts/default";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <DefaultLayout>
          <HomeNavigation />
        </DefaultLayout>
      </Router>
    </Provider>
  );
};

export default App;
