import React from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import cx from 'classnames';

import routes from 'components/routes';
import './index.less';


class NavBar extends React.Component {
  state = {
    search: routes.images.children[0].path,
  };

  static getDerivedStateFromProps(nextProps) {
    const search =  nextProps.location.search || routes.images.children[0].path;

    return {
      search,
    };
  };

  getLinks(navBarRoutes) {
    const {search} = this.state;

    return navBarRoutes.map((route) => (
      <NavLink
        key={route.path}
        exact
        to={`${routes.images.path}${route.path}`}
        className={cx({
          'filters-btn': true,
          'filters-btn--active': search === route.path,
        })}
      >
        {route.title}
      </NavLink>
    ));
  };

  render() {
    return (
      <nav className="NavBar container">
        {
          this.getLinks(routes.images.children)
        }
      </nav>
    );
  };
};

export default withRouter(NavBar);
