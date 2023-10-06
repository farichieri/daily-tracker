import Form from "@/components/LandingPage/Form/Form";
import MainLayout from "@/components/Layout/MainLayout";

const index = () => {
  return (
    <MainLayout>
      <div className="advertisement">
        <h1 className="title">Advertisement</h1>
        <h2>
          If you&apos;d like to give us feedback, advertise with us or become an
          author on our blog, please fill out the form:
        </h2>
        <Form />
      </div>
      <style jsx>{`
        .advertisement {
          padding: 1rem 0;
          width: 100%;
          margin: auto;
          max-width: var(--max-width-content);
        }
        h2 {
          margin: 2rem 0;
          text-align: left;
        }
        .title {
          width: 100%;
          text-align: center;
          font-size: 2.5rem;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
