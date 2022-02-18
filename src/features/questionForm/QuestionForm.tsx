import React, { useState } from 'react';
import { NEW_QUESTION } from "../../constants/questionsMutations";
import { useMutation, useQuery } from '@apollo/client';
import styles from '../questionForm/QuestionForm.module.scss';
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';


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
    }

    if (loading) return (<p>Patientez svp...</p>);

    if (error) return (<p>Erreur ! {error.message}</p>);

    return (
        <div className='row formContainer'>
            <h3 className="formTitle">Ajouter une question</h3>
            {data && data.createQuestion ? <p className='success'>Question sauvegardée !</p> : null}
            <form
                onSubmit={handleSubmit}
                className="newQuestionForm">
                <div className="formField">
                    <input
                        name="question"
                        onChange={e => setFormState({
                            ...formState,
                            question: e.target.value
                        })}
                        value={formState.question}
                        placeholder="Question"
                    />
                </div>
                <div className="formField">
                    <input
                        name="text"
                        onChange={e => setFormState({
                            ...formState,
                            text: e.target.value
                        })}
                        value={formState.text}
                        placeholder="Réponse"
                    />
                </div>
                <div className="formField">
                    <select
                        name="user_id"
                        onChange={e => setFormState({
                            ...formState,
                            userId: +e.target.value
                        })}
                        defaultValue={0}
                    >
                        <option value={0} disabled>{authors.loading ? 'Chargement des auteurs' : authors.error ? 'Erreur de chargement des auteurs, merci de recharger la page' : 'Sélectionner un auteur'}</option>
                        { authors.data && (
                            authors.data.allUsers.map((author:any) => (
                                <option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
                            ))
                        )}
                    </select>
                </div>
                <button className="formSubmit" type="submit">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default QuestionForm;