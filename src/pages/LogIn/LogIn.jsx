import { useForm } from 'react-hook-form'
import { Input } from '../../components'
import { logInUser } from '../../api'
import { useNavigate } from 'react-router-dom'
import styles from './LogIn.module.css'

function LogIn() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		try{			
			await logInUser(data);

			navigate('/learnings')

		}catch(error){
			console.error(error)
		}
	}

	return (
		<div className={styles.container}>
			<img
				className={styles.logo}
				src='/images/icons/logo_small.svg'
				alt='Logo'
			/>
			<h1 className={styles.title}>Log In StudySpace</h1>

			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input
						label='Email'
						type='email'
						name='email'
						register={register}
						errors={errors}
					/>
					<Input
						label='Password'
						type='password'
						name='password'
						register={register}
						errors={errors}
					/>
					<button className={`${styles.button} primary_btn`} type='submit'>
						Log In
					</button>
				</form>

				<div className={styles.footer}>
					<p>
						Are you a new user? <a href='/signUp'>Register</a>
					</p>
					<a href='/reset-password'>Reset password</a>
				</div>
			</div>
		</div>
	)
}

export default LogIn
