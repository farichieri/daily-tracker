import React from 'react';
import Clock from '../Clock/Clock';
import Button from '../Layout/Button/Button';
import FilterSelect from './FilterSelect/FilterSelect';

const Header = ({
  isSaving,
  isSaveable,
  handleSave,
  options,
  handleSelectFilterOption,
  optionSelected,
}: {
  isSaving: boolean;
  isSaveable: boolean;
  handleSave: any;
  options: any;
  handleSelectFilterOption: Function;
  optionSelected: string;
}) => {
  return (
    <div className='header'>
      <FilterSelect
        options={options}
        handleSelectFilterOption={handleSelectFilterOption}
        optionSelected={optionSelected}
      />
      <Button
        style={{ maxWidth: '100px' }}
        content='Save'
        isLoading={isSaving}
        isDisabled={!isSaveable}
        loadMessage={'Saving...'}
        onClick={handleSave}
      />
      <Clock />
      <style jsx>{`
        .header {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Header;
