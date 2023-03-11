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
          width: 100%;
          background: transparent;
        }
        .objetives-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .objetive-container {
          border-bottom: 1px solid var(--box-shadow-light);
          display: flex;
          background: var(--box-shadow-light);
          border-radius: 6px;
          overflow: auto;
          width: 100%;
        }
        .objetive-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 20%),
            inset -1px 0 0 rgb(255 255 255 / 20%),
            0 0 4px 0 rgb(95 99 104 / 60%), 0 0 6px 2px rgb(95 99 104 / 60%);
        }
        form {
          -webkit-box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          border-bottom: 1px solid var(--box-shadow-light);
          display: flex;
          border-radius: 6px;
          overflow: auto;
          width: 100%;
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
        placeholder='Goal'
        onChange={handleChange}
        value={value}
        name='objetive'
        id={id}
        spellCheck='false'
        autoComplete='off'
      />
      <style jsx>{`
        input {
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.25rem 0.3rem 0.25rem 0.5rem;
          width: 100%;
        }
      `}</style>
    </>
  );
};
