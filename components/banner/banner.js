
import styles from "/components/banner/banner.module.scss"


const Banner = ({buttonText,handleOnClick}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Coffee <span>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee stores!</p>
            <button className={styles.button} onClick={handleOnClick}>
                {buttonText}
            </button>
        </div>
    );
};
export default Banner