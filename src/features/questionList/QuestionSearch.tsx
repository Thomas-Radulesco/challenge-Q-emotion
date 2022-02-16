import React, {useState} from "react";


const QuestionSearch = ({refetch} : {refetch: any}) => {
    
    const [search, setSearch] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        refetch({q: search});
    };

    return (
        <form
            className="searchForm"
            onSubmit={handleSearch}
            >
            <label className="searchLabel">Rechercher</label>
            <input
                onChange={e => setSearch(e.target.value)}
                type="string"
                className="searchInput"
                name="search"
                value={search}
            />
            <button 
                type="submit"
            >
                Rechercher
            </button>
        </form>
    )

};

export default QuestionSearch;