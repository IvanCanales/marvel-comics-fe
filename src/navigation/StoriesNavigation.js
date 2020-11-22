import React from "react";
import { Route, Switch } from "react-router-dom";

import Stories from "../containers/Stories";
import StoryDetails from "../containers/StoryDetails";

const CharacterNavigation = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={StoryDetails} />
      <Route path={match.path} component={Stories} />
    </Switch>
  );
};

export default CharacterNavigation;
