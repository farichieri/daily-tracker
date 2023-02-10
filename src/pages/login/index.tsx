import MainLayout from '@/components/Layout/MainLayout';
import Login from '@/components/Login/Login';

const Index = () => {
  return (
    <MainLayout withPadding={true}>
      <Login />
    </MainLayout>
  );
};

export default Index;
