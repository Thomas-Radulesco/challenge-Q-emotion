import React, {useState} from "react";


const QuestionSearch = ({refetch} : {refetch: any}) => {
    
    const [search, setSearch] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        refetch({q: search});
    };

    return (
        <div className="row formContainer">
            <h3 className="formTitle">Rechercher une question</h3>
            <form
                className="searchForm"
                onSubmit={handleSearch}
                >
                <div className="formField">
                    <label className="searchLabel">Rechercher</label>
                    <input
                        onChange={e => setSearch(e.target.value)}
                        type="string"
                        className="searchInput"
                        name="search"
                        value={search}
                    />
                </div>
                <button 
                    type="submit"
                    className="formSubmit"
                >
                    Rechercher
                </button>
            </form>
        </div>
    )

};

export default QuestionSearch;