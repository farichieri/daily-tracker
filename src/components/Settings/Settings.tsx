import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import General from './options/General';
import Profile from './options/Profile';

const settingOptions = [
  {
    option: 'profile',
    component: <Profile />,
  },
  {
    option: 'general',
    component: <General />,
  },
];

const Settings = () => {
  const [settingSelected, setSettingSelected] = useState('profile');

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const optionSelected = (event.target as HTMLButtonElement).value;
    setSettingSelected(optionSelected);
  };

  const getOptionSelected = () => {
    if (settingSelected) {
      return settingOptions.find((option) => option.option === settingSelected)
        ?.component;
    }
  };

  return (
    <Modal>
      <div className='settings'>
        <div className='sidebar'>
          <p className='title'>Settings</p>
          {settingOptions.map((option, index) => (
            <button
              key={index}
              className={`${settingSelected === option.option && 'selected'}`}
              value={option.option}
              onClick={handleClick}
            >
              {option.option}
            </button>
          ))}
        </div>
        <div className='content'>{getOptionSelected()}</div>
      </div>
      <style jsx>{`
        .settings {
          width: 80vw;
          max-width: 900px;
          height: 80vh;
          display: flex;
        }
        .sidebar {
          width: 25vw;
          border-right: 1px solid var(--box-shadow-light);
          padding: 1rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: 0.3s;
        }
        .content {
          width: 75vw;
          padding: 1rem 2rem;
        }
        button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--text-color);
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 6px;
          text-transform: capitalize;
        }
        button:hover {
          background: var(--box-shadow-light);
        }
        button.selected {
          background: var(--box-shadow-light);
        }
        .title {
          margin: 0;
          border-bottom: 1px solid var(--box-shadow-light);
          padding-bottom: 0.5rem;
        }
      `}</style>
    </Modal>
  );
};

export default Settings;
