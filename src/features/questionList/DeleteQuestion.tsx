import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import styles from './QuestionList.module.scss';


const DeleteQuestion = ({question} : {question: any}) => {
    
    const [deleteQuestion] = useMutation(DELETE_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const handleDelete = () => {
        let questionText = question.question.split(' '); 
        if (questionText.length > 6) {
            questionText.splice(5);
            questionText.push('...');
        };
        questionText = questionText.join(' ');
        // eslint-disable-next-line no-restricted-globals
        let confirmDeletion = confirm(`Êtes-vous sûr de vouloir supprimer la question "${questionText}" ?`);
        if (confirmDeletion) {
            deleteQuestion({ variables: {
                id: question.id
            }})
        }
    }

    return(
        <div className={styles.deleteQuestion} onClick={handleDelete} role="button" aria-label="deleteButton">
            <FontAwesomeIcon icon={faTrashCan} color="#FC1983" />
        </div>
        )
}

export default DeleteQuestion;