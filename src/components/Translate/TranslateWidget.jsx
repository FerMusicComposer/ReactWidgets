import React, { useState } from 'react';
import DropdownOptions from '../Dropdown/DropdownOptions';
import LanguageConvert from './LanguageConvert';

//API key AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM

const options = [
    {
        label: 'Afrikaans',
        value: 'af',
    },
    {
        label: 'Arabic',
        value: 'ar',
    },
    {
        label: 'Hindi',
        value: 'hi',
    },
];

const TranslateWidget = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={event => setText(event.target.value)} />
                </div>
            </div>
            <DropdownOptions
                label="Select a language from the list"
                options={options}
                selection={language}
                setSelection={setLanguage}
            />
            <hr />
            <h3 className="ui header">Output</h3>
            <LanguageConvert text={text} language={language} />
        </div>
    );
};

export default TranslateWidget;
