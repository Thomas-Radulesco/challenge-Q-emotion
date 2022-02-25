import React, { useState } from 'react';
import { NEW_QUESTION } from "../../constants/questionsMutations";
import { useMutation, useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import { toggleOpenAdd, selectOpenAdd } from '../questionList/questionListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {
    StyledFabAddFormButton,
    StyledSubmitFormButton,
    StyledAddFormBox,
    StyledTextField
} from '../../styles/styledComponents';
import RichBoxHeader from '../../richComponents/RichBoxHeader';
import theme from '../../styles/theme';
import RichDialogBox from '../../richComponents/RichDialogBox';

const QuestionForm = () => {
    const [formState, setFormState] = useState({
        question: '',
        text: '',
        userId: 0
    });

    const [openAlert, setOpenAlert] = useState(false);

    const toggleOpenAlert = () => {
        setOpenAlert(!openAlert);
    };

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
            setOpenAlert(true);
        };
    };

    const formHeaderProps = {
        'props': {
            'title': 'Ajouter une question',
            'actions': {
                'returnActions': {
                    'closeButton': {
                        'action': toggleOpenAdd,
                        'color': theme.text.main,
                    },
                },
            },
        },
    };

    const richDialogBoxProps = {
        'props': {
            'open': openAlert,
            'setOpen': setOpenAlert,
            'title': 'Erreur',
            'text': 'Merci de sélectionner un auteur existant',
            'actions': {
                'yesAction': {
                    'bgColor': theme.form.submit,
                    'color': theme.text.main,
                    'buttonText': 'OK',
                    'handler': toggleOpenAlert,
                },
            },
        },
    };

    const openAdd = useAppSelector(selectOpenAdd);
    const dispatch = useAppDispatch();

    if (error) return (<p>Erreur ! {error.message}</p>);

    return (
        <>
            <Grow
                in={!openAdd}
                style={{
                    transformOrigin: '2rem 1rem',
                }}
                timeout={300}>
                <StyledFabAddFormButton color="primary" aria-label="add" onClick={() => dispatch(toggleOpenAdd())}>
                    <AddIcon />
                </StyledFabAddFormButton>
            </Grow>
        
            <Grow 
                in={openAdd}
                style={{
                    transformOrigin: '2rem 1rem',
                }}
                timeout={300}>
                <StyledAddFormBox
                    className={`row formContainer ${openAdd ? 'open' : ''}`}>
                    <RichBoxHeader {...formHeaderProps} />
                    {data && data.createQuestion ? <p className='success'>Question sauvegardée !</p> : null}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <StyledTextField 
                            name='question'
                            onChange={(e: any) => setFormState({
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
                            onChange={(e: any) => setFormState({
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
                        <FormControl required fullWidth variant='standard' sx={{mt: 2, mb:2, textAlign: "start"}}>
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
                        <StyledSubmitFormButton
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type='submit'
                        >
                            Ajouter
                        </StyledSubmitFormButton>
                    </Box>
                </StyledAddFormBox>
            </Grow>
        
            <RichDialogBox {...richDialogBoxProps}/>
        </>
    );
};

export default QuestionForm;