import styles from './QuestionList.module.scss';

const Question = (props:any) => {
  const { question } = props;
  return (
    <div className={styles.row}>
      <div>
        <p>Question : {question.question}</p>
        <p>Réponse : {question.text}</p>
        <p>Auteur : {question.User.firstName} {question.User.lastName}</p>
      </div>
    </div>
  );
};

export default Question;