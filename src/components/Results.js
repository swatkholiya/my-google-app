import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { fetchSearchResults } from '../services/apis';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Results() {
    let location = useLocation();
    let searchQuery = '';
    const [result, setResult] = useState(null);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    if (location && new URLSearchParams(location.search)) {
        searchQuery = new URLSearchParams(location.search).get('query');
    }

    useEffect(() => {
        fetchSearchResults(page).then(data => {
            setResult(data);
            setLoader(false);
            window.scrollTo(0, 0);
        }).catch(e => {
            setLoader(false);
            setError('Soemthing went wrong :(');
        })
    }, [location.search, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    return (
        <div className="resultsConatiner">
            <>
                {result && <div>About {result.page.totalElements.toLocaleString()} results</div>}
                {result && result._embedded.events.map((result, index) => {
                // {result1 && result1.map((result, index) => {
                    const { id, name, info, promoters, url } = result;
                    return <div key={id} className="searchResultContainer">
                        <a href={url}>{name}</a>
                        <p>{info}</p>
                        <p>No of Promoters: {promoters.length}</p>
                    </div>
                })}
                {result && <div className="paginatorContainer"><Pagination count={result.page.totalPages} onChange={handlePageChange} /></div>}
            </>
            {error && <div>{error}</div>}
            {loader && <div className="loader-container"><CircularProgress /></div>}
        </div>          
   )
}