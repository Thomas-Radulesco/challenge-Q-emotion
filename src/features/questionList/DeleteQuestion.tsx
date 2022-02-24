import { useMutation } from '@apollo/client';
import { DELETE_QUESTION } from "../../constants/questionsMutations";
import { GET_QUESTIONS } from '../../constants/questionsQueries';
import { GET_USERS } from '../../constants/usersQueries';
import theme from '../../styles/theme';
import RichDialogBox from '../../richComponents/RichDialogBox';

const DeleteQuestion = ({question, deletion, setDeletion} : {question: any, deletion: boolean, setDeletion: any}) => {
    
    const [deleteQuestion] = useMutation(DELETE_QUESTION, {
        refetchQueries: [
            GET_QUESTIONS,
            GET_USERS
        ],
    });

    const cancelDeletion = () => {
        setDeletion(false);
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

    const deleteThisQuestion = () => {
        deleteQuestion({
            variables: {
                id: question.id
            }
        });
    };

    const deleteQuestionDialogBox = {
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
                    'handler': cancelDeletion,
                },
                'yesAction': {
                    'bgColor': theme.form.cancel,
                    'color': theme.text.main,
                    'buttonText': 'Supprimer',
                    'handler': deleteThisQuestion,
                },
            },
        },
    };


    return(
        <RichDialogBox {...deleteQuestionDialogBox}/>
    );
};

export default DeleteQuestion;