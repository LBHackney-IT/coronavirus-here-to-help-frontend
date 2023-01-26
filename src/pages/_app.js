import "../styles/globals.css";
import "./stylesheets/all.scss";
import App from 'next/app';
import React from 'react';
import {
  authoriseUser,
  userIsInValidGroup,
  pathIsWhitelisted,
  serverSideRedirect,
  unsafeExtractUser
} from '../helpers/auth';
import { UserContext } from '../contexts/UserContext';
import { AccessDeniedPage } from '../components/AccessDeniedPage';

const CustomApp = ({
                     Component,
                     pageProps,
                     user,
                     accessDenied,
                   }) => {
  if (accessDenied) return <AccessDeniedPage />;

  return (
      <UserContext.Provider value={{ user }}>
        <Component {...pageProps} />
      </UserContext.Provider>
  );
};

CustomApp.getInitialProps = async (appContext) => {
  const {
    ctx: { req, res, pathname, asPath },
  } = appContext;
  const appProps = await App.getInitialProps(appContext);
  // const currentPath = asPath || '/';

  const user = req && res ? authoriseUser(req) : unsafeExtractUser();
  const props = { ...appProps, user };

  if (pathIsWhitelisted(pathname)) {
    return props;
  }

  if (!user) {
    const redirect = encodeURIComponent(asPath || '/');
    const url = `/login?redirect=${redirect}`;

    if (req && res) {
      serverSideRedirect(res, url);
    } else {
      window.location.replace(url);
    }

    return { accessDenied: true };
  }
  
  if (!userIsInValidGroup(user)) {
    console.warn('The user is not in the correct google group');
    return { accessDenied: true };
  }

  return props;
};

export default CustomApp;