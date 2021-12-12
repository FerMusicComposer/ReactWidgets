import React, { useEffect, useRef, useState } from 'react';

const DropdownOptions = ({ label, options, selection, setSelection }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const ref = useRef();

    useEffect(() => {
        /*All event listeners that are manually rendered, i.e. that are added with the DOM syntax, are rendered first regardless
         of it being triggered or not. This is because of the way event bubbling works on the DOM. Whenever an event is triggered from
         any component element, it starts travelling up the HTML tree, and everytime another event is found, this would be rendered as well.
         
         The exception is when the events are added with DOM syntax as described above. To fix this, a hook called useRef can be used.
         This hook can store an element as a variable and use it as reference for further functionality. In this case, useRef is being
         used on the parent div from the component in order to prevent the event using DOM syntax to be rendered when triggering the 
         assigned events inside the component*/

        const onBodyClick = event => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpenDropdown(false);
        };
        /* Capture is required from React 17 onwards to prevent events with DOM syntax from being executed even when 
        event.stopPropagation() is used. It is inserted as a 3rd argument on the addEventListener function */
        document.body.addEventListener('click', onBodyClick, { capture: true });

        /* This is a cleanup function that makes sure to remove the body event listener for when the Dropdown component is
        toggled by using the button implemented on the parent component which caused the page to crash because the event was still active
        and referring to the removed component which is replaced by "null" and thus the browser cannot read its properties. */
        return () => {
            document.body.removeEventListener('click', onBodyClick, {
                capture: true,
            });
        };
    }, []);

    const renderedOptions = options.map(option => {
        if (option.value === selection.value) {
            return null; //In React, null means 'do not render anything'
        }
        return (
            <div key={option.value} className="item" onClick={() => setSelection(option)}>
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className={`ui selection dropdown ${openDropdown ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selection.label}</div>
                    <div className={`menu ${openDropdown ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownOptions;
