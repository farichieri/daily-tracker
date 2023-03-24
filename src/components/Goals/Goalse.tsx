import { db } from '@/utils/firebase.config';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectTrackerSlice,
  setUpdateDayGoals,
} from 'store/slices/trackerSlice';
import Button from '../Layout/Button/Button';
import IconButton from '../Layout/Icon/IconButton';
import Tooltip from '../Layout/Tooltip/Tooltip';
import { useRouter } from 'next/router';

const Goals = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dayData } = useSelector(selectTrackerSlice);
  const { day_goals, day_date } = dayData;
  const { date } = router.query;
  const { user } = useSelector(selectUser);
  const [goalsState, setGoalsState] = useState<string[]>(day_goals);
  const [newGoal, setnewGoal] = useState('');
  const [isSaveable, setIsSaveable] = useState(false);
  const [showGoals, setShowObjetives] = useState(false);

  const handleObjetives = (e: any) => {
    e.preventDefault();
    setShowObjetives(!showGoals);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = (e.target as HTMLButtonElement).value;
    const id: number = Number((e.target as HTMLButtonElement).id || -1);
    if (goalsState.indexOf(goalsState[id]) > -1) {
      const newGoals = [...goalsState];
      newGoals[id] = value;
      setGoalsState(newGoals);
    } else {
      setnewGoal(value);
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (newGoal) {
      setGoalsState([...goalsState, newGoal]);
      setnewGoal('');
      setIsSaveable(true);
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    const newObjetives = goalsState.slice();
    newObjetives.splice(e.target.value, 1);
    setGoalsState(newObjetives);
    setIsSaveable(true);
  };

  const handleSave = async () => {
    if (JSON.stringify(day_goals) !== JSON.stringify(goalsState)) {
      if (!user) return;
      console.log('Updating Goals');
      const docRef = doc(db, 'users', user.uid, 'tracker', String(date));
      await setDoc(docRef, { day_goals: goalsState });
      dispatch(setUpdateDayGoals(goalsState));
    }
  };

  useEffect(() => {
    setGoalsState(day_goals);
  }, [day_date]);

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  return (
    <section>
      <div className='goals-button'>
        <Button
          style={null}
          content={showGoals ? 'Hide Goals' : 'Show Goals'}
          isLoading={false}
          isDisabled={false}
          loadMessage={''}
          onClick={handleObjetives}
        />
        <Tooltip
          content={
            <>
              Write down your goals <br /> every day to increase <br /> the
              likelihood of achieving them.
            </>
          }
          direction='top'
          delay={400}
        />
      </div>
      {showGoals && (
        <div className='objetives-container'>
          {goalsState?.map((obj, i) => (
            <div className='objetive-container' key={i}>
              <Goal
                value={obj}
                handleChange={handleChange}
                id={i}
                handleSave={handleSave}
              />
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
            <Goal
              handleChange={handleChange}
              value={newGoal}
              id={null}
              handleSave={handleSave}
            />
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
      )}

      <style jsx>{`
        section {
          width: 100%;
          background: transparent;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          padding-bottom: 10rem;
        }
        .goals-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0 1rem 0;
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
  handleSave,
}: {
  handleChange: any;
  value: string;
  id: any;
  handleSave: any;
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
        onBlur={handleSave}
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
