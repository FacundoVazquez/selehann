import React from 'react';
import { NotFound } from 'src/components/not-found';
import { Texts } from 'src/constants/texts';
import { Login } from 'src/features/auth/ui';
import { Developers } from 'src/features/developers/ui';
import { View } from 'src/views/types';

/* Definición de las vistas de la aplicación */

export interface Views {
  Auth: View;
  Developers: View;
  Not_Found: View;
}

export const views: Views = {
  Auth: { path: '/auth', component: <Login />, authPage: true },
  Developers: { title: Texts.DEVELOPERS, path: '/developers', component: <Developers />, scope: 'admin', homePage: true },
  // Not Found
  Not_Found: { title: Texts.NOT_FOUND, path: undefined, component: <NotFound /> },
};

export const getHomePage = () => {
  const viewsArray = Object.values(views) as View[];
  const homePage = viewsArray.find((v) => v.homePage)?.path ?? '/';

  return homePage;
};

export const getAuthPage = () => {
  const viewsArray = Object.values(views) as View[];
  const homePage = viewsArray.find((v) => v.authPage)?.path ?? '/';

  return homePage;
};
