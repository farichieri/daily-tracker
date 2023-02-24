import Layout from '@/components/Layout';
import { auth } from '@/utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any | string>('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser('');
    }
  });

  return (
    <Layout user={user}>
      <Component {...pageProps} user={user} />
    </Layout>
  );
}
