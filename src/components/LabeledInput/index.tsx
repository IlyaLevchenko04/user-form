import './index.css'

interface LabeledInputProps {
    label: string;
    inputType: string;
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const LabeledInput = (props: LabeledInputProps) => {

    return <div className='root'>
        <label htmlFor={props.id}>{props.label}</label>
        <input name={props.id} id={props.id} type={props.inputType} onChange={props.onChange}/>
    </div>
}