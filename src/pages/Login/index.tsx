import { useState } from 'react'
import { LabeledInput } from '../../components/LabeledInput'
import './index.css'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const target = e.target
    }

    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return <div className='login-container'>
        <form className='form-wrapper' onSubmit={onSubmit}>
            <LabeledInput id='username' label='Username' inputType='text'/>
            <LabeledInput id='password' label='Password' inputType='text' onChange={onPassChange}/>
            <button type='submit'>Login</button>
        </form>
    </div>
}