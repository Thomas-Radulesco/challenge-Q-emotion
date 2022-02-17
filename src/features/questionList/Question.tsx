import styles from './QuestionList.module.scss';

const Question = (props:any) => {
  const { question } = props;
  return (
    <div className="row">
      <div>
        <p className={styles.question}>Question : {question.question}</p>
        <p className={styles.text}>Réponse : {question.text}</p>
        <p className={styles.user}>Auteur : {question.User.firstName} {question.User.lastName}</p>
      </div>
    </div>
  );
};

export default Question;