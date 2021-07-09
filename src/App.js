import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchSuggestions } from './services/apis';
import SearchInputBox from './components/SearchInputBox';
import Results from './components/Results';
import useDebouncedEffect from './utils/useDebouncedEffect';

function App() {
    const { search } = window.location;
    const wrapperRef = useRef(null);
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [selectedOption, setSelectedOption] = useState(null);
    const [res, setSuggestionList] = useState(null);
    const [isListVisible, setListVisibility] = useState(false);
    const debouncedSearchTerm = useDebouncedEffect(searchQuery, 1000);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setListVisibility(false);
        }
    };

    useEffect(() => {
        if(debouncedSearchTerm) {
            fetchSuggestions(debouncedSearchTerm).then(res => {
                setSuggestionList(res);
                setListVisibility(true);
            });
        }else if(debouncedSearchTerm === '' || debouncedSearchTerm.length === 0) {
            setListVisibility(false);
        }    
    }, [debouncedSearchTerm]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
      }, []);

    return (
        <Router>
            <div className="my-googgle-app-container">
                <SearchInputBox
                    searchQuery={searchQuery}
                    selectedOption={selectedOption}
                    setSearchQuery={setSearchQuery}
                    setListVisibility={setListVisibility}
                />
                {isListVisible && <ul className="suggestions" ref={wrapperRef}>
                    {res && res._embedded && res._embedded.events && res._embedded.attractions && [...res._embedded.events, ...res._embedded.attractions].map((event) => (
                        <li
                            key={event.id}
                            onClick={() => { setSearchQuery(event.name); setSelectedOption(event) }}
                        >
                            {event.name}
                        </li>
                    ))}
                </ul>}
            </div>
            <Switch>
                <Route path="/siteSearch" render={(props) => <Results {...props} />} />
            </Switch>
        </Router>
    );
}
export default App;