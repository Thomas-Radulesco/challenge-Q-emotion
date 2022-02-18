import React from 'react';
import styles from './CustomLoader.module.scss';

const CustomLoader = ({props}: {props: any}) => {

return (

    <div className={styles.loadingNotice}>
        <div className={styles.loadingSpinner}>
            <svg className={styles.circularProgressBarSpinning} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" pathLength="100"/>
            </svg>
            <div className={styles.loadingIndicator}>{props.message}</div>
        </div>            
    </div>
    
)

};

export default CustomLoader