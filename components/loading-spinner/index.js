import styles from './style.module.css';

const LoadingSpinner = () => {
    return <div className={styles.container}>
            <div className={styles.ldsRipple}><div></div><div></div></div>
        </div>;
}

export default LoadingSpinner;