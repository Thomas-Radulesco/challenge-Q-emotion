import { Box, FormControl, Grow } from "@mui/material";
import React, {useState} from "react";
import { StyledFabSearchFormButton, StyledSearchFormBox, StyledTextField, StyledSubmitFormButton } from "../../styles/styledComponents";
import SearchIcon from '@mui/icons-material/Search';
import { toggleOpenSearch, selectOpenSearch } from './questionListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import RichBoxHeader from "../../richComponents/RichBoxHeader";
import theme from '../../styles/theme';
import { NetworkStatus, useQuery } from '@apollo/client';



const QuestionSearch = ({refetch, loading} : {refetch: any, loading: any}) => {
    
    const [search, setSearch] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        refetch({q: search});
    };

    const openSearch = useAppSelector(selectOpenSearch);
    const dispatch = useAppDispatch();

    const searchFormHeaderProps = {
        'props': {
            'title': 'Rechercher une question',
            'actions': {
                'returnActions': {
                    'closeButton': {
                        'action': toggleOpenSearch,
                        'color': theme.text.main,
                    },
                },
            },
        },
    };

    return (
        <>
            <Grow
                in={!openSearch}
                style={{
                    transformOrigin: '7rem 1rem',
                }}
                timeout={300}>
                <StyledFabSearchFormButton color="primary" aria-label="add" onClick={() => dispatch(toggleOpenSearch())}>
                    <SearchIcon />
                </StyledFabSearchFormButton>
            </Grow>

            <Grow 
                in={openSearch}
                style={{
                    transformOrigin: '7rem 1rem',
                }}
                timeout={300}>
                <StyledSearchFormBox
                    className={`row formContainer ${openSearch ? 'open' : ''}`}>
                    <RichBoxHeader {...searchFormHeaderProps} />
                    <Box
                        component="form"
                    onSubmit={handleSearch}
                    >
                        <StyledTextField 
                            name='search'
                            onChange={(e: any) => setSearch(e.target.value)}
                            value={search}
                            helperText="Termes de la recherche"
                            variant="standard"
                            fullWidth
                            label="Recherche"
                        />
                        
                        <StyledSubmitFormButton
                            loading={loading===NetworkStatus.loading}
                            loadingPosition="start"
                            startIcon={<SearchIcon />}
                            variant="contained"
                            type='submit'
                        >
                            Rechercher
                        </StyledSubmitFormButton>
                    </Box>
                </StyledSearchFormBox>
            </Grow>
        </>
    )

};

export default QuestionSearch;