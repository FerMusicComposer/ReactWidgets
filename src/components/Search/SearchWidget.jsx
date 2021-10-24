import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

const SearchWidget = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        /* - the useEffect hook cannot be marked as an asynchronous function. The workaround to use async functions is to either
        create a variable and set it to an async function, invoke the async function without assigning it to a variable, and calling 
        it right after invocation, or to use regular promise syntax. 
        */
        const apiCall = async () => {
            /*     - Storing the API call on a variable makes it easy to use later. In this case, it will be needed to fetch the search
            results and store them on the empty array set as the state of results 

            - Here only the domain and app parts of the URL are passed as firts parameter, as the rest of it consist of a
            query object. To pass the rest of the URL, the query object is divided in the params object which appends each of
            the keys specified there to the URL. This makes it more readable and allows to pass variables into the link, as the
            term in this case  */

            const { data } = await axios.get(
                'https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: term,
                    },
                },
            );

            /* - This updates the state of "result" */
            setResults(data.query.search);
        };

        /* - This logic is to prevent an error in which the API complains about having an empty string as a search term, which is the
        initial state of "term". A hardcoded value can also be passed to term by default, but this would return a default search
        without allowing the user to choose what would the 1st search be. 
        
        - Also, the setTimeOut() function ensures that the API call is made after the user finishes typing, otherwise it wil generate 
        one API call each time the input changes.
        Assigning the time out function to a variable allows to store its ID which can then be used to reset the timer
        
        - The way this code is implemented now, will affect the initial search if there is a default search term assigned to the "term"
        state. To fix this, simply insert the code into the following condition: if (term && !results.length) {apiCall()} else 
        {timeOut function + cleanup function}. This will perform a search on 1st render and then apply the timeout on input change
        */
        const timeOutId = setTimeout(() => {
            if (term) {
                apiCall();
            }
        }, 1000);

        /*   - This is a feature of the useEffect function which is called a cleanup function. This code will be executed on from the first
        rerender on, and what it does is basically to reset the useEffect hook. The ony code that can be returned from the useEffect
        function is another function
        */
        return () => {
            clearTimeout(timeOutId);
        };
    }, [term]);

    /* 
        - The previous useEffect implementation, could lead to a warning on the console if this logic is implemented: 
            - Default state for term using a hardcoded word
            - API call structure to perform a search on 1st render bypassing the 1s wait of the timeOut function:
                if (term && !results.length) {
                    apiCall()
                } else {
                    timeOut function + cleanup function
                };

        - The warning would say that the useEffect is missing the dependency "results.length" which if added, would resolve this minor
       issue but then, because of the way the useEffect hook works, it would duplicate the API call as on first render, the term would be 
       the hardcoded value and "results.lenght would be 0", and when that initial search is performed, results would be updated and thus, 
       useEffect would rerender and a duplicated API call would be generated. The solution is as follows:
            
            * Define a new state that keeps track of the term    
            const [debouncedTerm, setDebouncedTerm] = useState(term);
            
            * Create a useEffect that sets a timer for this second state, and resets it everytime term is updated. 
            useEffect(() => {
                const timerId = setTimeout(() => {
                    setDebouncedTerm(term);
                }, 1000);

                return () => {
                    clearTimeout(timerId);
                };
            });

            * Create the useEffect that generates the API call passing the variable that keeps track of the term instead of the
            term itself
            useEffect(() => {
                const search = async () => {
                    const { data } = await axios.get(
                        'https://en.wikipedia.org/w/api.php',
                        {
                            params: {
                                action: 'query',
                                list: 'search',
                                origin: '*',
                                format: 'json',
                                srsearch: debouncedTerm,
                            },
                        },
                    );

                    setResults(data.query.search);
                };
                if (debouncedTerm) {
                    search();
                }
            }, [debouncedTerm]);

        - This is a complex solution which is hard to understand when reading the code and thus, the best way to avoid it is by
        not hardcoding a default state for "term". That way, the missing dependency warning will not occur and no warnings or errors
        will be logged.   
        */
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search term</label>
                    <input
                        type="text"
                        className="input"
                        value={term}
                        onChange={event => setTerm(event.target.value)}
                    />
                </div>
            </div>
            <SearchResults results={results} />
        </div>
    );
};

export default SearchWidget;
