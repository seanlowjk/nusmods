import React, { useEffect, useState } from 'react';
import styles from './CustomModuleModalButtonGroup.scss';
import classNames from 'classnames';

interface CustomModuleModalButtonGroupProps {
  options: number[];
  defaultSelected: boolean[];
  onChange: (selected: number[]) => void;
}

const CustomModuleModalButtonGroup: React.FC<CustomModuleModalButtonGroupProps> = ({
  options,
  defaultSelected,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    onChange(options.filter((_, index) => selected[index]));
  }, [selected]);

  return (
    <div className={styles.buttonGroup}>
      {options.map((option, index) => (
        <button
          key={option}
          className={classNames(
            'btn',
            styles.button,
            selected[index] ? 'btn-primary' : 'btn-outline-primary',
          )}
          onClick={() => {
            // Toggle the option in the selected list
            const newSelected = [...selected];
            newSelected[index] = !newSelected[index];
            setSelected(newSelected);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default CustomModuleModalButtonGroup;
