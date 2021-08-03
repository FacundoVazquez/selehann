import { matchPath, useLocation } from 'react-router-dom';
import { history } from 'src/app/store';
import { getHomePage, getAuthPage, views } from 'src/views';
import { View } from 'src/views/types';

/**
 * Get current route (location pathname).
 */
export const getRoute = () => {
  return history.location.pathname;
};

/**
 * Go to home page.
 */
export function goToHomePage() {
  history.push(getHomePage());
}

/**
 * Go to home page.
 */
export function goToAuthPage() {
  history.push(getAuthPage());
}

/**
 * Go to back page.
 */
export function goBack() {
  history.goBack();
}

/**
 * Go to page.
 */
export function goTo(path: string) {
  history.push(path);
}

/**
 * Replace the current page.
 */
export function replaceRoute(path: string) {
  history.replace(path);
}

/**
 * Hook to parse query string.
 */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Get matched pathname of views
 */
export function getMatchedPathname(pathname?: string) {
  const view: View = Object.values(views).find((view: View) => {
    return matchPath(pathname || getRoute(), {
      path: view.path,
      exact: true,
      strict: true,
    });
  });

  return view && view.path;
}
