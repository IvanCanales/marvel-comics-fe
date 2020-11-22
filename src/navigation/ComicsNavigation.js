import React from "react";
import { Route, Switch } from "react-router-dom";

import Comics from "../containers/Comics";
import ComicDetails from "../containers/ComicDetails";

const ComicsNavigation = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={ComicDetails} />
      <Route path={match.path} component={Comics} />
    </Switch>
  );
};

export default ComicsNavigation;
