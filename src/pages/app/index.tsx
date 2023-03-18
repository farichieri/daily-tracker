import Loader from '@/components/Layout/Loader/Loader';
import Login from '@/components/Auth/Login';
import { selectUser } from 'store/slices/authSlice';
import { selectIsLoadingData } from 'store/slices/trackerSlice';
import { useSelector } from 'react-redux';
import { selectGlobalState } from 'store/slices/globalSlice';
import TrackerLayout from '@/components/Layout/TrackerLayout';

const TrackerPage = () => {
  const { user, isVerifyingUser } = useSelector(selectUser);
  const isLoadingData = useSelector(selectIsLoadingData);
  const { isDataFetched } = useSelector(selectGlobalState);

  return (
    <TrackerLayout>
      {isVerifyingUser || isLoadingData ? (
        <Loader fullScreen={false} text={''} />
      ) : (
        !user && (
          <div className='login-container'>
            <Login />
          </div>
        )
      )}
      <style jsx>{`
        .login-container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          margin: auto;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </TrackerLayout>
  );
};

export default TrackerPage;
