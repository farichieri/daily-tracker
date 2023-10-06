import MainLayout from "@/components/Layout/MainLayout";
import { plans } from "@/utils/plans";
import Link from "next/link";
import { useState } from "react";

const Plan = ({ plan }: { plan: any }) => {
  const [promo, setPromo] = useState("");

  return (
    <MainLayout>
      <div className="payment-container">
        <h2>Subscribe today</h2>
        <div className="payment">
          <form>
            <input placeholder="Your name" type={"text"} />
            <input placeholder="Your email" type={"email"} />
            <input placeholder="Card number" type={"text"} />
            <button>Join today</button>
            <p>
              By signing up you agreed to our{" "}
              <Link href={"/terms"} target="_blank">
                terms.
              </Link>
            </p>
          </form>
          <div className="detail">
            <h3>Plan detail {plan.plan}</h3>
            <p>{plan.description}</p>
            <p>{plan.checkoutDescription}</p>
            <p>
              Your subscription will continue until you cancel. You can cancel
              anytime.
            </p>
            {promo && <p>Your {promo} promo code has been applied</p>}
            <div className="detail-charge">
              <p>Total charge</p>
              <p>{plan.yearPrice}</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .payment-container {
          display: flex;
          flex-direction: column;
          margin: auto;
          gap: 0.5rem;
          width: 100%;
          max-width: var(--max-width);
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          padding: 2rem;
          border-radius: 10px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        .payment {
          display: flex;
          gap: 1rem;
        }
        input {
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
        button {
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .detail {
          border: 1px solid var(--box-shadow-light);
          text-align: left;
          width: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 4px;
          width: 100%;
        }
        .detail-charge {
          display: flex;
          justify-content: space-between;
        }
        @media screen and (max-width: 900px) {
          .payment {
            flex-wrap: wrap-reverse;
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default Plan;

export const getStaticPaths = async () => {
  const paths = plans.map((plan) => {
    return {
      params: {
        plan: plan.plan,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const plan = plans.find((plan) => plan.plan === params.plan);
  return {
    props: {
      plan,
    },
  };
};
