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
  return (
    <section>
      <p>Objetives</p>
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
          border-radius: 20px 20px 0 0;
          margin-bottom: 1rem;
          width: 100%;
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          overflow: auto;
        }
        p {
          padding: 0.5rem;
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
        }
        form {
          display: flex;
          width: 100%;
        }
        button {
          width: 35px;
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
          padding: 0.5rem 0.3rem 0.3rem 0.5rem;
          display: flex;
        }
      `}</style>
    </>
  );
};
