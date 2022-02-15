import { GET_QUESTIONS } from "../../constants/questionsAPI";
import { useQuery } from '@apollo/client';
import Question from './Question';
import styles from './QuestionList.module.scss';


export function QuestionList() {
    
    const { loading, error, data } = useQuery(GET_QUESTIONS, { errorPolicy: 'all' });

    if (loading) return <p>Loading...</p>;
    if (error) {
        return (
          <p className={styles.error}>
              Error :
              {error.graphQLErrors.map(({ message } : {message:string}, i) => (
                  <span key={i}> {message}</span>
              ))}
              {error.networkError?.message}
          </p>
        )};
    return (
      <div>
        {data && (
          <>
            {data.allQuestions.map((question:any) => (
              <Question key={question.id} question={question} />
            ))}
          </>
        )}
      </div>
    );
};
