import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../containers/Home";
import StoriesNavigation from "./StoriesNavigation";
import NoMatch from "../containers/NoMatch";
import ComicsNavigation from "./ComicsNavigation";
import CharactersNavigation from "./CharactersNavigation";

const MainNavigation = () => {
  return (
    <Switch>
      <Route path="/comics" component={ComicsNavigation} />
      <Route path="/characters" component={CharactersNavigation} />
      <Route path="/stories" component={StoriesNavigation} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default MainNavigation;
