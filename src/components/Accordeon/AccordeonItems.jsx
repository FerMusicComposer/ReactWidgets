import React, { useState } from 'react';

const AccordeonItems = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = index => {
        setActiveIndex(index);
        console.log('Title Clicked ', index);
    };

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

export default AccordeonItems;
