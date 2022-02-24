import {useState} from 'react';
import styles from './QuestionList.module.scss';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';
import { useMutation } from '@apollo/client';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import { StyledEditIconButton, StyledFurtherActionsButtons, StyledRichBoxHeader } from '../../styles/styledComponents';
import EditIcon from '@mui/icons-material/Edit';
import RichBoxHeader from '../../richComponents/RichBoxHeader';
import theme from '../../styles/theme';


const Question = (props:any) => {

  const { question } = props;
  const [edition, setEdition] = useState(false);
  const [deletion, setDeletion] = useState(false);
  
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
  };

  const handleEdit = () => {
    setEdition(true);
  };

  const handleDeletion = () => {
    setDeletion(true);
  };

  const toggleDeletion = () => {
    setDeletion(!deletion);
    console.log(deletion);
       
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
                'action': toggleDeletion,
                'color': theme.button.delete,
            },
        },
      },
    },
  };

  const getLimitedQuestionText = () => {
    let questionText = question.question.split(' '); 
    if (questionText.length > 6) {
        questionText.splice(5);
        questionText.push('...');
    };
    questionText = questionText.join(' ');
    return questionText;
  };

  const richDeletionDialogBoxProps = {
    'props': {
      'open': deletion,
      'setOpen': setDeletion,
      'title': 'Confirmer la suppression',
      'text': `Êtes-vous sûr de vouloir supprimer la question "${getLimitedQuestionText()}" ?`,
      'actions': {
        'noAction': {
          'bgColor': theme.form.submit,
          'color': theme.text.main,
          'buttonText': 'Annuler',
          'handler': toggleDeletion,
        },
        'yesAction': {
          'bgColor': theme.form.cancel,
          'color': theme.text.main,
          'buttonText': 'Supprimer',
          'handler': handleDelete,
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