import styles from './GovLinkBox.module.scss';
import Link from "next/link";

export default function GovLinkBox({ link, text, name }) {

    return (
        <Link href={link}>
            <a className={styles['gov-link-box']} data-testid={name}>
                { text }
            </a>
        </Link>
    );
}
