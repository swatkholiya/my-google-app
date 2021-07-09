import React from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";

export default function SearchInputBox({ searchQuery, setSearchQuery, selectedOption,setListVisibility }) {
    const history = useHistory();
    const onSubmit = (e) => {
        setListVisibility(false);
        history.push({
            pathname: '/siteSearch',
            search: `?query=${searchQuery}`,
            state: { selectedOption: selectedOption }
        })
        e.preventDefault()
    }

    return <form action="/" method="get" autoComplete="off" onSubmit={onSubmit} className="searchContainer">
        <input
            value={searchQuery}
            onInput={e => { 
                setSearchQuery(e.target.value);               
            }}
            type="text"
            id="header-search"
            placeholder="Search events"
            name="query"
        />
        <button type="submit">Search</button>
    </form>
};