import styles from './QuestionList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import DeleteQuestion from './DeleteQuestion';


const Question = (props:any) => {
  const { question } = props;
  
  return (
    <div className="row">

      <div className={styles.questionActions}>
        <div className={styles.editQuestion}>
          <FontAwesomeIcon icon={faPenToSquare} color="#ffe649" />
        </div>
        <DeleteQuestion question={question}/>
      </div>

      <div>
        <p className={styles.question}>Question : {question.question}</p>
        <p className={styles.text}>Réponse : {question.text}</p>
        <p className={styles.user}>Auteur : {question.User.firstName} {question.User.lastName}</p>
      </div>
    </div>
  );
};

export default Question;