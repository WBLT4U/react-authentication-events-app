import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { getAuthToken } from '../util/auth';

function NewEventPage() {
  return <EventForm method="post" />;
}

export default NewEventPage;

export async function action({ request }) {
  const token = getAuthToken();
  
  if (!token || token === 'EXPIRED') {
    throw json(
      { message: 'Not authenticated or token expired' },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const eventData = Object.fromEntries(formData);

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      { message: errorData.message || 'Could not save event.' },
      { status: response.status }
    );
  }

  return redirect('/events');
}