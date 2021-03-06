/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectStrings,
} from 'containers/App/selectors';
import StringList from 'components/StringsList';

import { loadStrings } from '../App/actions';
import saga from './saga';
import reducer from '../App/reducer';

const key = 'home';

export function HomePage({ loading, error, strings }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  const stringsListProps = {
    loading,
    error,
    strings,
  };
  console.log('what about stringlistprops in homepage', stringsListProps)
  console.log('in homepage index can we get strings', strings)

  return (
    <div>
      <h2>Strings App</h2>
      <NavLink exact to="/add">
        Add String
      </NavLink>
      <div>
        <StringList {...stringsListProps} />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  strings: makeSelectStrings(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return dispatch(loadStrings());
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
