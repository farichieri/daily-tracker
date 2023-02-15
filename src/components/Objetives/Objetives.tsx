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
