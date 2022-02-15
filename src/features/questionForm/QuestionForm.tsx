import React, { useState } from 'react';
import { NEW_QUESTION } from "../../constants/questionsMutations";
import { useMutation } from '@apollo/client';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './QuestionForm.module.scss';
import { GET_QUESTIONS } from '../../constants/questionsQueries';

interface QuestionList {
    id: number;
    question: string;
    text: string;
    user_id: number;
}

interface NewQuestionDetails {
    question: string;
    text: string;
    user_id: number;
}


export function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(0);

    const [saveQuestion, { data, loading, error }] = useMutation(NEW_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
        ],
    });

    if (loading) return (<p>Patientez svp...</p>);

    if (error) return (<p>Erreur ! {error.message}</p>);

    // const dispatch = useAppDispatch();

    return (
        <div className={styles.row}>
            <div>
                <h3>Ajouter une question</h3>
                {data && data.saveQuestion ? <p>Saved!</p> : null}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveQuestion({ variables: {
                            question: question,
                            text: text,
                            user_id: userId
                        }});
                    }}>
                    <p>
                        <label>Question</label>
                        <input
                            name="question"
                            onChange={e => setQuestion(e.target.value)}
                        />
                    </p>
                    <p>
                        <label>Réponse</label>
                        <input
                            name="text"
                            onChange={e => setText(e.target.value)}
                        />
                    </p>
                    <p>
                        <label>Auteur</label>
                        <input
                            type="number"
                            name="user_id"
                            onChange={e => setUserId(+e.target.value)}
                        />
                    </p>
                    <button type="submit">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};