import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_QUESTION } from "../../constants/questionsMutations";
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';

const EditQuestion = ({question, setEdition} : {question: any, setEdition: any}) => {

    const [formState, setFormState] = useState({
        question: question.question,
        text: question.text,
        userId: question.user_id
    });

    const [updateQuestion, { data, loading, error }] = useMutation(UPDATE_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const authors = useQuery(GET_USERS);

    const authorValidation = () => {
        let availableAuthors = authors.data.allUsers.map((author: any) => (Number(author.id)));
        
        if (availableAuthors.includes(Number(formState.userId))) {
            return true;
        }
        return false;
    };

    const cancelEdition = () => {
        setEdition(false);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let validAuthor = authorValidation();
        if (validAuthor) { 
            updateQuestion({ variables: {
                id: question.id,
                question: formState.question,
                text: formState.text,
                user_id: formState.userId
            }})
            setFormState({
                question: '',
                text: '',
                userId: 0
            })
            setEdition(false);
        } else {
            alert("Merci de sélectionner un auteur existant");
        };
    }

    if (loading) return (<p>Patientez svp...</p>);

    if (error) return (<p>Erreur ! {error.message}</p>);


    return (
        <div className='row formContainer'>
            <h3 className="formTitle">Modifier la question</h3>
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
                        defaultValue={question.user_id}
                    >
                        <option value={0} disabled>{authors.loading ? 'Chargement des auteurs' : authors.error ? 'Erreur de chargement des auteurs, merci de recharger la page' : 'Sélectionner un auteur'}</option>
                        { authors.data && (
                            authors.data.allUsers.map((author:any) => (
                                <option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
                            ))
                        )}
                    </select>
                </div>
                <button className="formCancel" type="button" onClick={cancelEdition}>
                    Annuler
                </button>
                <button className="formSubmit" type="submit">
                    Sauvegarder
                </button>
            </form>
        </div>
    )
}

export default EditQuestion;