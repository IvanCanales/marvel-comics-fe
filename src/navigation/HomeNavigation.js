import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../containers/Home";
import Stories from "../containers/Stories";
import NoMatch from "../containers/NoMatch";
import ComicsNavigation from "./ComicsNavigation";
import CharactersNavigation from "./CharactersNavigation";

const HomeNavigation = () => {
  return (
    <Switch>
      <Route path="/comics" component={ComicsNavigation} />
      <Route path="/characters" component={CharactersNavigation} />
      <Route path="/stories">
        <Stories />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default HomeNavigation;
