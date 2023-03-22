import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import CreateAndEditLabel from './CreateAndEditLabel';

const Labels = () => {
  const { labels } = useSelector(selectLabels);
  const [createLabel, setCreateLabel] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState('');

  const closeModalOnClick = () => {
    setCreateLabel(false);
    setLabelToEdit('');
  };
  return (
    <div className='labels'>
      {createLabel && (
        <CreateAndEditLabel
          labelToEdit={''}
          action='create'
          closeModalOnClick={closeModalOnClick}
        />
      )}
      {labelToEdit && (
        <CreateAndEditLabel
          labelToEdit={labelToEdit}
          action='edit'
          closeModalOnClick={closeModalOnClick}
        />
      )}
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
              <span
                className='label-name'
                style={{ background: `${labels[label].label_color}` }}
              >
                {labels[label].label_name}
              </span>
              <div className='buttons'>
                <Link href={`/app/labels/${label}`}>
                  <button>Tasks</button>
                </Link>
                <button
                  onClick={() => setLabelToEdit(label)}
                  className='edit-label'
                >
                  Edit
                </button>
              </div>
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
          border: none;
          border-bottom: 1px solid var(--box-shadow-light);
          width: 100%;
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        .buttons {
          display: flex;
          gap: 0.5rem;
        }
        button {
          cursor: pointer;
          pointer-events: initial;
          background: transparent;
          color: var(--text-color);
          border: 1px solid var(--box-shadow);
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .add-label {
          margin-left: auto;
        }
        .label-name {
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Labels;
