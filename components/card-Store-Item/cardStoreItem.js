import styles from "./cardStoreItem.module.scss"
import Link from "next/link"
import Image from "next/image"
import cls from 'classnames'


const CardStoreItem = ({name,imgUrl,href}) => {
    return (
        <div className={cls("glass",styles.cardStoreItem)}>
            <Link href={href}>
                <h2>{name}</h2>
                <Image src={imgUrl} alt=""  width={260} height={160}  style={{ width: '100%'}}></Image>
            </Link>
        </div>
    )
}

export default CardStoreItem