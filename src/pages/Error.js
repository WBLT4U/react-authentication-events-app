// src/ErrorPage.js
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error('Error details:', error); // This will log to console
  
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      {error.data && (
        <pre>{JSON.stringify(error.data, null, 2)}</pre>
      )}
    </div>
  );
}