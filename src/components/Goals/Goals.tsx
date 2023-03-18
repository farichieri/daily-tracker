import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTrackerSlice } from 'store/slices/trackerSlice';
import IconButton from '../Layout/Icon/IconButton';

const Goals = () => {
  const { dayData } = useSelector(selectTrackerSlice);
  const { day_goals } = dayData;
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setnewGoal] = useState('');

  console.log({ newGoal });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = (e.target as HTMLButtonElement).value;
    const id: number = Number((e.target as HTMLButtonElement).id || -1);
    if (goals.indexOf(goals[id]) > -1) {
      const newObjetives = [...goals];
      newObjetives[id] = value;
      setGoals(newObjetives);
    } else {
      setnewGoal(value);
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (newGoal) {
      setGoals([...goals, newGoal]);
      setnewGoal('');
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    const newObjetives = goals.slice();
    newObjetives.splice(e.target.value, 1);
    setGoals(newObjetives);
  };

  return (
    <section>
      <div className='objetives-container'>
        {day_goals?.map((obj, i) => (
          <div className='objetive-container' key={i}>
            <Goal value={obj} handleChange={handleChange} id={i} />
            <IconButton
              onClick={(e) => handleRemove(e)}
              props={{ value: i }}
              src={'/icons/delete.png'}
              alt='Delete-Icon'
              width={24}
              height={24}
            />
          </div>
        ))}
        <form onSubmit={(e) => handleAdd(e)}>
          <Goal handleChange={handleChange} value={newGoal} id={null} />
          <IconButton
            props={null}
            onClick={(e) => handleAdd(e)}
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

export default Goals;

const Goal = ({
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
