import React from 'react';
import AccordeonItem from './AccordionItems';

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

const AccordionWidget = () => {
    return (
        <div className="ui styled accordion">
            <AccordeonItem items={items} />
        </div>
    );
};

export default AccordionWidget;
