import React from 'react';

const SearchResults = ({ results }) => {
    //console.log(`comming from the parent: ${results}`);

    return (
        <div className="ui celled list">
            {results.map(result => {
                //This is a regular expression to remove all the html tags from the text
                const textContentWithoutHtmlTags = result.snippet.replace(
                    /<[^>]+>/g,
                    '',
                );
                return (
                    <div className="item" key={result.pageid}>
                        <div className="right floated content">
                            <a
                                className="ui button"
                                href={`https://en.wikipedia.org?curid=${result.pageid}`}
                            >
                                Go
                            </a>
                        </div>
                        <div className="content">
                            <div className="header">{result.title}</div>
                            {textContentWithoutHtmlTags}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResults;
