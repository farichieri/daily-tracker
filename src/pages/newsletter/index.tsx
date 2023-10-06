import EmailInput from "@/components/LandingPage/EmailInput/EmailInput";
import MainLayout from "@/components/Layout/MainLayout";

const index = () => {
  return (
    <MainLayout>
      <section className="m-auto flex h-[50vh] w-full max-w-5xl items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">
            Increase your productivity now!
          </h1>
          <p>Join us and get the best tips every week to achieve your goals</p>
          <EmailInput textButton={"Try now!"} />
        </div>
      </section>
    </MainLayout>
  );
};

export default index;
