import React from 'react';
import AccordeonWidget from './Accordeon/AccordeonWidget';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front-end javascript framework',
    },
    {
        title: 'Why use React?',
        content: 'React is a favorite javascript librry among engineers',
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components',
    },
];

const App = () => {
    return (
        <div>
            <AccordeonWidget items={items} />
        </div>
    );
};

export default App;
