import General from './options/General';
import Modal from '../Modal/Modal';
import Plan from './options/Plan';
import Profile from './options/Profile';
import React, { useState } from 'react';
import Support from './options/Support';
import About from './options/About';
import Theme from './options/Theme';

const settingOptions = [
  {
    option: 'profile',
    component: <Profile />,
  },
  {
    option: 'subscription',
    component: <Plan />,
  },
  {
    option: 'general',
    component: <General />,
  },
  {
    option: 'Theme',
    component: <Theme />,
  },
  {
    option: 'support',
    component: <Support />,
  },
  {
    option: 'about',
    component: <About />,
  },
];

const Settings = ({ closeModalOnClick }: { closeModalOnClick: Function }) => {
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
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
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
          height: 50vh;
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
