import styles from '../components/common.module.css'

type Props = {
    label?: string;
    name: string;
    value: string;
    rows?: number;
    cols?: number;
    maxlength?: number;
    required?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className1?: string;
    className2?: string;
    className3?: string;
}

const Textarea = ({
    label,
    name,
    value,
    rows,
    cols,
    maxlength,
    required = false,
    disabled = false,
    onChange,
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
                <textarea className={className3}
                    name={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    maxLength={maxlength}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                />
            </div>
            
        </div>
       
    );
};

export default Textarea;
