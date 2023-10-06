import MainLayout from "@/components/Layout/MainLayout";
import { plans } from "@/utils/plans";
import Image from "next/image";
import Link from "next/link";

const Plans = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {plans.map((plan, index) => (
        <Link key={index} href={`/pricing/${plan.plan}`}>
          <div className="flex h-full w-72 flex-col gap-4 rounded-2xl border border-[var(--box-shadow)] p-4 shadow-md shadow-[var(--box-shadow-light)] hover:shadow-xl hover:shadow-[var(--box-shadow-light)] hover:duration-300">
            <h1>{plan.name}</h1>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <div className="checks">
              {plan.checks.map((check) => (
                <div className="check" key={check}>
                  <Image
                    src={"/icons/check.png"}
                    alt="check"
                    width={20}
                    height={20}
                  />
                  {check}
                </div>
              ))}
            </div>
            <button className="rounded-3xl border border-cyan-500 bg-cyan-800 p-2 text-white">
              Get {plan.name}
            </button>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .check {
          gap: 0.25rem;
          align-items: center;
          display: flex;
        }
        button {
          cursor: pointer;
          border-radius: 3px;
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

const index = () => {
  return (
    <MainLayout >
      <div className="flex h-[87vh] flex-col items-start justify-center gap-4">
        <h1 className="text-left text-2xl font-semibold">
          Find the right plan
        </h1>
        <div className="plans">
          <Plans />
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
