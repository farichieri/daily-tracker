import PremiumLayout from '@/components/Layout/PremiumLayout';
import { db } from '@/utils/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import TodoList from '@/components/TodoList/TodoList';
import Loader from '@/components/Layout/Loader/Loader';
import { setLabels } from 'store/slices/labelsSlice';
import Labels from '../Labels/Labels';
import { Label, LabelGroup } from '@/global/types';

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  // const [isLoading, setIsLoading] = useState(true);

  const getLabels = async () => {
    if (user) {
      console.log('Fetching Labels');
      let data: LabelGroup = {};
      const docRef = collection(db, 'users', user.uid, 'labels');
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((label: any) => {
        data[label.id] = label.data();
      });
      dispatch(setLabels(data));
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getLabels();
  }, [user]);

  return (
    <PremiumLayout withPadding={false}>
      {/* {isLoading && <Loader fullScreen={false} text={''} />} */}
      {/* <div className='todo'>{user && <TodoList />}</div> */}
      <Labels />
      {children}
      <style jsx>{`
        .todo {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height) + 1rem);
          margin: 0 1rem;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default LabelsLayout;
