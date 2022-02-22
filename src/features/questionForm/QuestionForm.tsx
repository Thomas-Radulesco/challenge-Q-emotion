import React, { useState } from 'react';
import { NEW_QUESTION } from "../../constants/questionsMutations";
import { useMutation, useQuery } from '@apollo/client';
import styles from '../questionForm/QuestionForm.module.scss';
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import { toggleOpen, selectOpen } from './questionFormSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box, { BoxProps } from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import styled from 'styled-components';
import { darken } from '@mui/material/styles';

const StyledFabAddFormButton = styled(Fab) `
    position: fixed;
    top: 1rem;
    left: 1rem;
`;

const StyledCancelButton = styled(IconButton) `
    position: absolute;
    top: 1rem;
    left: 2rem;
    color : ${(props: any) => props.theme.text.main};
`;

const StyledAddQuestionButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    backgroundColor: theme.form.submit,
    color: theme.text.main,
    fontWeight: 700,
    fontSize: "1.1rem",
    '&:hover' : {
        backgroundColor: darken(theme.form.submit, 0.3)
    },
}));

const StyledFormBox = styled(Box)<BoxProps>(() => ({
    position: "fixed",
    top: "1rem",
    left: "2rem",
    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
    padding: "2rem",
}));

const StyledTextField = styled(TextField) `
    margin-top: 1rem;
`;

const QuestionForm = () => {
    const [formState, setFormState] = useState({
        question: '',
        text: '',
        userId: 0
    });

    const [saveQuestion, { data, loading, error }] = useMutation(NEW_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const authors = useQuery(GET_USERS);

    const authorValidation = () => {
        let availableAuthors = authors.data.allUsers.map((author: any) => (Number(author.id)))

        if (availableAuthors.includes(formState.userId)) {
            return true;
        }
        return false;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let validAuthor = authorValidation();
        if (validAuthor) { 
            saveQuestion({ variables: {
                question: formState.question,
                text: formState.text,
                user_id: formState.userId
            }})
            setFormState({
                question: '',
                text: '',
                userId: 0
            })
        } else {
            alert("Merci de sélectionner un auteur existant");
        };
    };

    const open = useAppSelector(selectOpen);
    const dispatch = useAppDispatch();

    if (error) return (<p>Erreur ! {error.message}</p>);

    return (
        <>
        
            <Zoom
                in={!open}
                style={{
                    transformOrigin: '2rem 1rem',
                }}
                timeout={200}
            >
                <StyledFabAddFormButton color="primary" aria-label="add" onClick={() => dispatch(toggleOpen())}>
                    <AddIcon />
                </StyledFabAddFormButton>
            </Zoom>
        
       
            <Zoom 
                in={open}
                style={{
                    transformOrigin: '2rem 1rem',
                }}
                timeout={200}
            >
                <StyledFormBox
                    className={`row formContainer ${open ? 'open' : ''}`}
                >
                    <StyledCancelButton aria-label="back" onClick={() => dispatch(toggleOpen())}>
                        <ArrowBackIcon />
                    </StyledCancelButton>
                    <h3 className="formTitle">Ajouter une question</h3>
                    {data && data.createQuestion ? <p className='success'>Question sauvegardée !</p> : null}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <StyledTextField 
                            name='question'
                            onChange={e => setFormState({
                                ...formState,
                                question: e.target.value
                            })}
                            value={formState.question}
                            helperText="Tapez la question"
                            variant="standard"
                            fullWidth
                            label="Question"
                        />
                        <StyledTextField
                            name='text'
                            onChange={e => setFormState({
                                ...formState,
                                text: e.target.value
                            })}
                            value={formState.text}
                            helperText="Tapez la réponse"
                            variant="standard"
                            fullWidth
                            label="Réponse"
                            sx={{
                                mt: 1
                            }}
                        />
                        <FormControl required fullWidth variant='standard' sx={{mt: 2, textAlign: "start"}}>
                            <InputLabel>
                                Auteur
                            </InputLabel>
                            <Select
                                name="user_id"
                                onChange={e => setFormState({
                                    ...formState,
                                    userId: +e.target.value
                                })}
                                defaultValue={0}
                                label="Auteur"
                                value={formState.userId}
                            >
                                <MenuItem value={0} disabled>{authors.loading ? 'Chargement des auteurs' : authors.error ? 'Erreur de chargement des auteurs, merci de recharger la page' : 'Sélectionner un auteur'}</MenuItem>
                                { authors.data && (
                                    authors.data.allUsers.map((author:any) => (
                                        <MenuItem key={author.id} value={author.id}>{author.firstName} {author.lastName}</MenuItem>
                                    ))
                                )}                            
                            </Select>
                            <FormHelperText>Sélectionner l'auteur (requis)</FormHelperText>
                        </FormControl>
                        <StyledAddQuestionButton
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type='submit'
                        >
                            Ajouter
                        </StyledAddQuestionButton>
                    </Box>
                </StyledFormBox>
            </Zoom>
        
        </>
    );
};

export default QuestionForm;