import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import styles from './RegisterForm.module.css'
import { signUpUser, logInUser } from '../../api'
import { useNavigate } from 'react-router'

const RegistrationForm = ({ inputs, title, type }) => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		const password = data.password
		const confirmPassword = data.confirmPassword

		try{
			if(password !== confirmPassword){
				throw new Error('Passwords do not match')
			}

			data.type = type;

			await signUpUser(data);
			
			await logInUser({ email: data.email, password: password });

			navigate('/learnings')

		}catch(error){
			console.error(error)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.inputs}>
				{inputs.map(input => (
					<Input
						key={input.name}
						label={input.label}
						type={input.type}
						register={register}
						name={input.name}
						errors={errors}
					/>
				))}
			</div>

			<button className={`${styles.button} primary_btn`} type='submit'>
				Register
			</button>
			<p className={styles.link}>
				Already have account? <a href='/logIn'>Log in</a>
			</p>
		</form>
	)
}

RegistrationForm.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	inputs: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
}

export default RegistrationForm
