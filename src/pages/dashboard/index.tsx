import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Logout from '@/components/Auth/Logout';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import { auth, db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker';
import { collection, getDocs, setDoc } from 'firebase/firestore';

const index = () => {
  const [user, setUser] = useState<any | string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser('');
    }
    setIsLoading(false);
  });

  useEffect(() => {
    const getUserData = async () => {
      let data: any[] = [];
      const date = new Date().toLocaleDateString().replaceAll('/', '-');
      const querySnapshot = await getDocs(collection(db, user.uid));
      querySnapshot.forEach((doc) => {
        data.push({ date: doc.id, data: doc.data() });
      });
      setData(data);
    };
    if (user) {
      getUserData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <MainLayout withPadding={true}>
        <div className='dashboard-container'>
          Verificando usuario...
          <Loader />
        </div>
        <style jsx>{`
          div {
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: center;
            margin: auto;
            min-height: 100vh;
          }
        `}</style>
      </MainLayout>
    );
  } else
    return (
      <MainLayout withPadding={true}>
        <div className='dashboard-container'>
          {!user && <Login />}
          {user && (
            <>
              <div className='admin-nav'>
                <Logout />
              </div>
              <Tracker userID={user.uid} userData={data} />
            </>
          )}
        </div>
        <style jsx>{`
          .dashboard-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
          }
          .tours-container {
            margin: auto;
            width: 100%;
          }
          .admin-nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
          }
        `}</style>
      </MainLayout>
    );
};

export default index;

// export const getServerSideProps = async () => {
//   let tours: any[] = [];
//   const querySnapshot = await getDocs(collection(db, 'tours'));
//   querySnapshot.forEach((doc) => {
//     tours.push(doc.data());
//   });
//   tours.sort((a, b) => b.date.localeCompare(a.date));

//   let views: any[] = [];
//   const viewsSnapshot = await getDocs(collection(db, 'analytics'));
//   viewsSnapshot.forEach((doc) => {
//     views.push(doc.data());
//   });

//   return {
//     props: { tours, views },
//   };
// };
