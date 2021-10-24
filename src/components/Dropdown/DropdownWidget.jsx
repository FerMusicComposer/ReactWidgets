import React, { useState } from 'react';
import DropdownOptions from './DropdownOptions';

const options = [
    {
        label: 'Red',
        value: 'red',
    },
    {
        label: 'Green',
        value: 'green',
    },
    {
        label: 'Blue',
        value: 'blue',
    },
];

const DropdownWidget = () => {
    const [selection, setSelection] = useState({});
    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div>
            {showDropdown ? (
                <DropdownOptions
                    selection={selection}
                    setSelection={setSelection}
                    options={options}
                />
            ) : null}
            <button onClick={() => setShowDropdown(!showDropdown)}>
                Toggle Dropdown
            </button>
        </div>
    );
};

export default DropdownWidget;
