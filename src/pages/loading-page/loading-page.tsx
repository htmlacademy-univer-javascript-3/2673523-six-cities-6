import styles from './loading-page.module.css';

function LoadingPage() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default LoadingPage;
