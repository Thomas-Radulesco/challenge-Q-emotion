import { GET_QUESTIONS } from "../../constants/questionsQueries";
import { useQuery } from '@apollo/client';
import Question from './Question';
import QuestionSearch from './QuestionSearch';
import CustomLoader from "../loader/CustomLoader";
import styles from './QuestionList.module.scss';


export function QuestionList() {
    
    const { loading, error, data, refetch } = useQuery(GET_QUESTIONS, { errorPolicy: 'all' });
    
    if (loading) return (
      <div className={styles.loadingNotice}>
        <div className={styles.loadingSpinner}>
          <CustomLoader/>
          <div className={styles.loadingIndicator}>Chargement des questions ...</div>
        </div>            
      </div>
    );
    if (error) {
      return (
        <p className="error">
          Error :
          {error.graphQLErrors.map(({ message } : {message:string}, i) => (
            <span key={i}> {message}</span>
          ))}
          {error.networkError?.message}
        </p>
      )};
    
    return (
      <div>
        <QuestionSearch refetch={refetch}/>
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
