import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import styles from './QuestionList.module.scss';


const DeleteQuestion = ({question} : {question: any}) => {
    
    const [deleteQuestion, { data, loading, error }] = useMutation(DELETE_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const handleDelete = () => {
        deleteQuestion({ variables: {
            id: question.id
        }})
    }

    return(
        <div className={styles.deleteQuestion} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} color="#ff2b83" />
        </div>
        )
}

export default DeleteQuestion;