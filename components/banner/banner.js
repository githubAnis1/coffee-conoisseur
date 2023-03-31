
import styles from "/components/banner/banner.module.scss"


const Banner = ({buttonText,handleOnClick}) => {
    return (
        <div className={styles.banner_container}>
            <h1>
                Coffee <span>Connoisseur</span>
            </h1>
            <p>Discover your local coffee stores!</p>
            <button onClick={handleOnClick}>
                {buttonText}
            </button>
        </div>
    );
};
export default Banner