const API_KEY = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

export const fetchSuggestions = async(query) => {
    return fetch(`https://app.ticketmaster.com/discovery/v2/suggest?keyword=${query}&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`)
            .then(res => res.json())
            .then(data => data)  
}

export const fetchSearchResults = (page) => {
    return fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&page=${page}`)
            .then(res => res.json())
            .then(data => data)
}