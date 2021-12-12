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
                    label="Select a color from the list"
                    selection={selection}
                    setSelection={setSelection}
                    options={options}
                />
            ) : null}
            <br />
            <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
        </div>
    );
};

export default DropdownWidget;
