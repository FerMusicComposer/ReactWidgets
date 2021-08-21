import React from 'react';
import AccordeonItem from './AccordeonItems';

const AccordeonWidget = ({ items }) => {
    return (
        <div className="ui styled accordion">
            <AccordeonItem items={items} />
        </div>
    );
};

export default AccordeonWidget;
