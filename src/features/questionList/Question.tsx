import React, {useState} from 'react';
import styles from './QuestionList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';


const Question = (props:any) => {
  const { question } = props;
  const [edition, setEdition] = useState(false);
  
  const handleEdit = () => {
    setEdition(true);
  }
  
  return (
    <div className="row">

      <div className={styles.questionActions} data-testid="actions">

        <div className={styles.editQuestion} onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} color="#ffe649" />
        </div>

        <DeleteQuestion question={question}/>
      </div>

      {edition &&
        <EditQuestion question={question} setEdition={setEdition}></EditQuestion>
      }

      {!edition &&
        <div data-testid="question">
          <p className={styles.question}>Question : {question.question}</p>
          <p className={styles.text}>Réponse : {question.text}</p>
          <p className={styles.user}>Auteur : {question.User.firstName} {question.User.lastName}</p>
        </div>
      }

    </div>
  );
};

export default Question;