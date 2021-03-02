import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState("programing");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                }
            });
            setResults(data.query.search);
        }
        
        const timeoutId = setTimeout(() => {
            if (term) {
                search();
            }
        }, 600);

        return () => {
            clearTimeout(timeoutId);
        }
        
    }, [term]);

    const renderedResults = results.map(r => {
        return (
            <div key={r.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${r.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {r.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: r.snippet}}></span>
                </div>
            </div>
        )
    })
    return (
        <div>
            <div className="ui form">
                <div className="field">
                <label>Enter Search Term</label>
                <input
                value={term}
                onChange={e => setTerm(e.target.value)}
                className="input"></input>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search;