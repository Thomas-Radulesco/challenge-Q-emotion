import { GET_QUESTIONS } from "../../constants/questionsQueries";
import { NetworkStatus, useQuery } from '@apollo/client';
import Question from './Question';
import QuestionSearch from './QuestionSearch';
import CustomLoader from "../loader/CustomLoader";


const QuestionList = () => {
    
    const { error, data, refetch, networkStatus } = useQuery(GET_QUESTIONS, {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true
    });
    
    let nbOfResults = 0;

    if(data) {
      nbOfResults = data.allQuestions.length;
    };

    if (networkStatus === NetworkStatus.refetch)       
      return (
      <CustomLoader props={{
        message: 'Recherche des questions ...'
      }}/>
    );

    if (networkStatus === NetworkStatus.loading) return (
      <CustomLoader props={{
        message: 'Chargement des questions ...'
      }}/>
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
      <div data-testid="questionList">
        <QuestionSearch refetch={refetch} loading={networkStatus}/>
        {nbOfResults===0 && (
          <p>Pas de résultat</p>
        )}
        {data && (
          <>
            {data.allQuestions.map((question:any) => {              
              return (
                <Question key={question.id} question={question} />
            )})}
          </>
        )}
      </div>
    );
};


export default QuestionList;