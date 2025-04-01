import { redirect } from 'next/navigation';

// TEMP: Redirect page public routes
export default function HomePage() {
  redirect('/sign-in');
}
