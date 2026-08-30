import styles from '../components/common.module.css'

type Props = {
    name: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className1?: string;
}

const Button = ({
    name,
    onClick,
    className1
}: Props) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`${styles.button} ${className1}`}>
            {name}
        </button>
    );
};

export default Button;
