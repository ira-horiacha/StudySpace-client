import { useState } from 'react'
import styles from './SignUp.module.css'
import { RegisterForm } from '../../components'

function SignUp() {
	const [teacher, setTeacher] = useState(null)

	const studentInputs = [
		{ label: 'Personal Code', type: 'text', name: 'personalCode' },
		{ label: 'Full Name', type: 'text', name: 'fullName' },
		{ label: 'Email', type: 'email', name: 'email' },
		{ label: 'Password', type: 'password', name: 'password' },
		{ label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
	]

	const teacherInputs = [
		{ label: 'Full Name', type: 'text', name: 'firstName' },
		{ label: 'Email', type: 'email', name: 'email' },
		{ label: 'Password', type: 'password', name: 'password' },
		{ label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
	]

	return (
		<div className={styles.container}>
			<img
				className={styles.logo}
				src='/images/icons/logo_small.svg'
				alt='Logo'
			/>
			<h1 className={styles.title}>Sign up in StudySpace</h1>

			<div className={styles.wrapper}>
				<h3 className={styles.subtitle}>Who are you?</h3>
				<div className={styles.choice_wrapper}>
					<div
						className={`${styles.choice} secondary_btn`}
						onClick={() => setTeacher(true)}
					>
						Teacher
					</div>
					<div
						className={`${styles.choice} secondary_btn`}
						onClick={() => setTeacher(false)}
					>
						Student
					</div>
				</div>

				<div className={styles.footer}>
					<p>
						Already have account? <a href='/logIn'>Log in</a>
					</p>
				</div>
			</div>

			{teacher && teacher !== null && (
				<div className={styles.form}>
					<RegisterForm
						title='Register as Teacher'
						inputs={teacherInputs}
						type='teacher'
					/>
				</div>
			)}

			{!teacher && teacher !== null && (
				<div className={styles.form}>
					<RegisterForm
						title='Register as Student'
						inputs={studentInputs}
						type='student'
					/>
				</div>
			)}
		</div>
	)
}

export default SignUp
