import React, { useState } from 'react';
import { NEW_QUESTION } from "../../constants/questionsMutations";
import { useMutation, useQuery } from '@apollo/client';
import styles from '../questionForm/QuestionForm.module.scss';
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';


export function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(0);

    const [saveQuestion, { data, loading, error }] = useMutation(NEW_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const authors = useQuery(GET_USERS);

    const authorValidation = () => {
        let availableAuthors = authors.data.allUsers.map((author: any) => (Number(author.id)))

        if (availableAuthors.includes(userId)) {
            return true;
        }
        return false;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let validAuthor = authorValidation();
        if (validAuthor) { 
            saveQuestion({ variables: {
                question: question,
                text: text,
                user_id: userId
            }})
            setQuestion('');
            setText('');
            setUserId(0);
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
                    <label>Question</label>
                    <input
                        name="question"
                        onChange={e => setQuestion(e.target.value)}
                        value={question}
                    />
                </div>
                <div className="formField">
                    <label>Réponse</label>
                    <input
                        name="text"
                        onChange={e => setText(e.target.value)}
                        value={text}
                    />
                </div>
                <div className="formField">
                    <label>Auteur</label>
                    <select
                        name="user_id"
                        onChange={e => setUserId(+e.target.value)}
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