import React, {useState} from 'react';
import styles from './QuestionList.module.scss';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';
import RichBoxHeader from '../../richComponents/RichBoxHeader';
import theme from '../../styles/theme';


const Question = (props:any) => {

  const { question } = props;
  const [edition, setEdition] = useState(false);
  const [deletion, setDeletion] = useState(false);
  
  const handleEdit = () => {
    setEdition(true);
  };

  const handleDelete = () => {
    setDeletion(true);       
  };

  const questionHeaderProps = {
    'props': {
      'title': 'Question',
      'actions':{
        'furtherActions': {
            'editButton': {
                'action': handleEdit,
                'color': theme.button.edit,
            },
            'deleteButton': {
                'action': handleDelete,
                'color': theme.button.delete,
            },
        },
      },
    },
  };

  return (
    <div className="row">
      {edition &&
        <EditQuestion question={question} setEdition={setEdition}></EditQuestion>
      }
      {!edition &&
      <>
        <RichBoxHeader {...questionHeaderProps} />
        <div data-testid="question">
          <p className={styles.question}>Question : {question.question}</p>
          <p className={styles.text}>Réponse : {question.text}</p>
          <p className={styles.user}>Auteur : {question.User.firstName} {question.User.lastName}</p>
        </div>
      </>
      }
      {deletion &&
        <DeleteQuestion question={question} deletion={deletion} setDeletion={setDeletion} />
      }
    </div>
  );
};

export default Question;