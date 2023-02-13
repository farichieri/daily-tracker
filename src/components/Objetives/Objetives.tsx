import { useState } from 'react';

const Objetives = () => {
  const [objetives, setObjetives] = useState<string[]>([]);
  const [objetive, setObjetive] = useState<string>('');

  const handleChange = (e: any) => {
    e.preventDefault();
    if (objetives.indexOf(objetives[e.target.id]) > -1) {
      const newObjetives = [...objetives];
      newObjetives[e.target.id] = e.target.value;
      setObjetives(newObjetives);
    } else {
      setObjetive(e.target.value);
    }
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (objetive) {
      setObjetives([...objetives, objetive]);
      setObjetive('');
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    const newObjetives = objetives.slice();
    newObjetives.splice(e.target.value, 1);
    setObjetives(newObjetives);
  };

  return (
    <section>
      Objetives
      <div className='objetives-container'>
        {objetives.map((obj, i) => (
          <div className='objetive-container' key={i}>
            <Objetive value={obj} handleChange={handleChange} id={i} />
            <button onClick={handleRemove} value={i}>
              x
            </button>
          </div>
        ))}
        <form onSubmit={handleAdd}>
          <Objetive handleChange={handleChange} value={objetive} id={null} />
          <button>+</button>
        </form>
      </div>
      <style jsx>{`
        section {
          border: 1px solid gray;
          border-radius: 5px;
          margin-bottom: 1rem;
          width: 100%;
        }
        .objetives-container {
          border-top: 1px solid gray;
          display: flex;
          flex-direction: column;
        }
        .objetive-container {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
        form {
          display: flex;
          width: 100%;
        }
        button {
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
      />
      <style jsx>{`
        input {
          width: 100%;
          background: none;
          color: var(--text-color);
          border: none;
          border-bottom: 1px solid var(--box-shadow);
          outline: none;
          padding: 0.1rem 0.3rem;
        }
      `}</style>
    </>
  );
};
