import React from 'react';
import AccordionWidget from './Accordion/AccordionWidget';
import SearchWidget from './Search/SearchWidget';
import DropdownWidget from './Dropdown/DropdownWidget';
import TranslateWidget from './Translate/TranslateWidget';
import Route from './Route';
import Navbar from './Navbar';

const App = () => {
    return (
        <div>
            <Navbar />
            <Route path="/">
                <AccordionWidget />
            </Route>
            <Route path="/search">
                <SearchWidget />
            </Route>
            <Route path="/dropdown">
                <DropdownWidget />
            </Route>
            <Route path="/translate">
                <TranslateWidget />
            </Route>
        </div>
    );
};

export default App;
