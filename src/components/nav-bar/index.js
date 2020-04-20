import React from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import cx from 'classnames';

import routes from 'components/routes';
import './index.scoped.less';

class NavBar extends React.Component {
  state = {
    search: routes.images.children[0].path,
  }

  render() {
    return (
      <nav className="navbar container">
        {routes.images.children.map((route) => {
          const {title, path} = route;

          return (
            <NavLink
              key={path}
              exact
              to={`${routes.images.path}${path}`}
              className={cx({
                'navlink': true,
                'navlink--active': this.state.search === path,
              })}
            >
              {title}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  static getDerivedStateFromProps(nextProps) {
    const search = nextProps.location.search || routes.images.children[0].path;

    return {
      search,
    };
  }
}

export default withRouter(NavBar);
