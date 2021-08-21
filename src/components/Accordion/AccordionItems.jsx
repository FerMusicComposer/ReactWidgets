import React, { useState } from 'react';

const AccordionItems = ({ items }) => {
    //Initializing the state
    const [activeIndex, setActiveIndex] = useState(null);

    //Function that sets the sate to the index of the title clicked
    const onTitleClick = index => {
        setActiveIndex(index);
        console.log('Title Clicked ', index);
    };

    //Iterating through the items array to assign each one to an accordion item
    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';
        return (
            <React.Fragment key={item.title}>
                <div
                    onClick={() => onTitleClick(index)}
                    className={`title ${active}`}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });

    return <div>{renderedItems}</div>;
};

export default AccordionItems;
