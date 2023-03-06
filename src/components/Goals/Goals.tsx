import { types } from '@/utils/types';
import IconButton from '../Layout/Icon/IconButton';

const Objetives = ({
  handleChange,
  handleAdd,
  handleRemove,
  objetive,
  objetives,
}: {
  handleChange: any;
  handleAdd: any;
  handleRemove: any;
  objetive: string;
  objetives: string[];
}) => {
  // -Repetition of affirmation of orders to your subconscious mind is the only known method of voluntary developtment of the emotions of faith.
  // -Any impulse of thought which is repeatedly passed on to the subconscious mind is, finally accepted and acted upon by the subsconscious mind, which proceeds to translate that impulse into its physical equivalent, by the most practical procedure available.
  return (
    <section>
      <p>Goals</p>
      <div className='objetives-container'>
        {objetives?.map((obj, i) => (
          <div className='objetive-container' key={i}>
            <Objetive
              value={obj}
              handleChange={(e: string) => handleChange(e, types.objetives)}
              id={i}
            />
            <IconButton
              onClick={(e) => handleRemove(e, types.objetives)}
              props={{ value: i }}
              src={'/icons/delete.png'}
              alt='Delete-Icon'
              width={24}
              height={24}
            />
          </div>
        ))}
        <form onSubmit={(e) => handleAdd(e, types.objetives)}>
          <Objetive
            handleChange={(e: string) => handleChange(e, types.objetives)}
            value={objetive}
            id={null}
          />
          <IconButton
            props={null}
            onClick={(e) => handleAdd(e, types.objetives)}
            src={'/icons/add.png'}
            alt='Add-Icon'
            width={24}
            height={24}
          />
        </form>
      </div>
      <style jsx>{`
        section {
          border-radius: 6px;
          margin-bottom: 1rem;
          width: 100%;
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          overflow: auto;
          background: var(--bg-color-secondary);
        }
        p {
          margin: 0;
          padding: 0.25rem;
          font-size: 1rem;
          font-weight: bold;
        }
        .objetives-container {
          border-top: 1px solid gray;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .objetive-container {
          display: flex;
          width: 100%;
          justify-content: space-between;
          border-bottom: 1px solid var(--box-shadow-light);
          padding-right: 0.5rem;
        }
        .objetive-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 20%),
            inset -1px 0 0 rgb(255 255 255 / 20%),
            0 0 4px 0 rgb(95 99 104 / 60%), 0 0 6px 2px rgb(95 99 104 / 60%);
        }

        form {
          display: flex;
          width: 100%;
          padding-right: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default Objetives;

const Objetive = ({
  handleChange,
  value,
  id,
}: {
  handleChange: any;
  value: string;
  id: any;
}) => {
  return (
    <>
      <input
        placeholder='objetive'
        onChange={handleChange}
        value={value}
        name='objetive'
        id={id}
        spellCheck='false'
        autoComplete='off'
      />
      <style jsx>{`
        input {
          width: 100%;
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.5rem 0.3rem 0.3rem 0.5rem;
          display: flex;
        }
      `}</style>
    </>
  );
};
