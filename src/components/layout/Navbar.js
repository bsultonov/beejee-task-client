import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

const Navbar = ({auth: {token}, logout}) => {
    const logoutLink = (
      <ul>
        <li>
          <Link to="/create">
            Создать задачу
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>
            Выйти
          </Link>
        </li>
      </ul>
    );

    const loginLink = (
      <ul>
        <li>
          <Link to="/create">
            Создать задачу
          </Link>
        </li>
        <li>
          <Link to="/login">
            Войти
          </Link>
        </li>
      </ul>
    );
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            BeeJee Tasks
          </Link>
        </h1>
        {<Fragment>{token ? logoutLink : loginLink}</Fragment> }
      </nav>
    )
}

Navbar.prototype = {
  logout: PropTypes.array.isRequired,
  auth: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);