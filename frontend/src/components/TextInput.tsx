import styles from '../components/common.module.css'

type Props = {
    type? : string;
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    readOnly?: boolean;
    className1?: string;
    className2?: string;
    className3?: string;
}

const TextInput = ({
    type = "text",
    label,
    name,
    value,
    onChange,
    required = false,
    readOnly = false,
    className1,
    className2,
    className3
}: Props) => {
    return (
        <div>
            <div className={className1}>
                {label && <label>{label}</label>}
            </div>
            
            <div className={className2}>
                <input className={`${styles.input} ${className3}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required = {required}
                    readOnly = {readOnly}
                />
            </div>
        </div>
        
    );
};

export default TextInput;
