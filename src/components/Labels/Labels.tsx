import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import CreateLabel from './CreateLabel';

const Labels = () => {
  const { labels } = useSelector(selectLabels);
  const [createLabel, setCreateLabel] = useState(false);
  const closeModalOnClick = () => {
    setCreateLabel(false);
  };
  return (
    <div className='labels'>
      {createLabel && <CreateLabel closeModalOnClick={closeModalOnClick} />}
      <div className='title-container'>
        <span className=''>Labels</span>
        <button className='add-label' onClick={() => setCreateLabel(true)}>
          +
        </button>
      </div>
      <div className='labels-container'>
        {labels &&
          Object.keys(labels).map((label) => (
            <div className='label-container' key={label}>
              <span>{labels[label].label_name}</span>
            </div>
          ))}
      </div>
      <style jsx>{`
        .labels {
          padding-top: var(--premium-nav-height);
          display: flex;
          flex-direction: column;
          align-items: start;
          width: 100%;
          text-align: left;
          max-width: var(--max-width-content);
          gap: 1rem;
          margin: 2rem;
        }
        .title-container {
          border-bottom: 1px solid var(--box-shadow-light);
          width: 100%;
          display: flex;
        }
        .labels-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .label-container {
          border: 1px solid var(--box-shadow-light);
          border-radius: 6px;
          width: 100%;
          padding: 0.5rem 1rem;
        }
        .add-label {
          margin-left: auto;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Labels;
