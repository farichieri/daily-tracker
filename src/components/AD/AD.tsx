import Link from 'next/link';
import React from 'react';

const AD = () => {
  return (
    <div className='ad'>
      <div className='header'>
        <h1>Ad Title</h1>
        <p>AD</p>
      </div>
      <p>
        Don't be the average security professional that spends 4,300 hours
        annually to maintain compliance. Simplify your audits and reduce your
        workload with G2's 5-star rated compliance automation platform.
      </p>
      <Link href={'link'}>Request a Demo</Link>
      <style jsx>
        {`
          .ad {
            padding: 1rem;
            border: 1px solid gray;
            width: 100%;
            border-radius: 1rem;
            margin: 1rem;
            text-align: left;
            display: flex;
            flex-direction: column;
            height: fit-content;
            margin: 0 auto 1rem auto;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default AD;
