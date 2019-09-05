import React from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';

import routes from 'components/routes';


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

    return navBarRoutes.map((route) => {
      const activeClass = search === route.path ? 'img-filters__button--active' : '';

      return (
        <NavLink
          exact
          to={`${routes.images.path}${route.path}`}
          className={`img-filters__button ${activeClass}`}
        >
          {route.title}
        </NavLink>
      );
    });
  };

  render() {
    return (
      <header>
        <nav class="img-filters container">
          {
            this.getLinks(routes.images.children)
          }
        </nav>
      </header>
    );
  };
};

export default withRouter(NavBar);
