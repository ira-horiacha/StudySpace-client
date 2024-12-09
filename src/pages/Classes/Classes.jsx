import styles from './Classes.module.css'
import { Input, Slider } from '../../components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function Classes() {
	const [add, setAdd] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const courses = [
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			description: 'Figma Practice',
			progress: 50,
		},
		{
			title: 'Git Responsibility [Online]',
			description: 'Git Basics',
			progress: 50,
		},
		{
			title: 'Git Responsibility [Online]',
			description: 'Git Basics',
			progress: 25,
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			description: 'Figma Practice',
			progress: 0,
		},
	]

	const meetings_upcoming = [
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 17',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 21',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 30',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 17',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 21',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 30',
		},
	]

	const tasks_upcoming = [
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 12',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 13',
		},
		{
			title: 'UI|UX Design Self-Paced [Junior]',
			date: 'Thu, Nov 10',
		},
	]

	const onSubmit = async data => {
		try {
			console.log(data)

			window.location.reload()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.user}>
					<img
						className={styles.avatar}
						src='./images/icons/profile-icon.svg'
						alt='avatar'
					/>
					<p>Username</p>
				</div>

				<div className={styles.learnings_wrapper}>
					<div className={styles.learnings}>
						<a href='#'>
							<div className={styles.learning_item}>
								<img
									className={styles.tasks_icon}
									src='./images/icons/tasks.svg'
									alt='tasks'
								/>
								<p>
									Tasks <br /> <span>1</span>
								</p>
							</div>
						</a>
						<a href='#'>
							<div className={styles.learning_item}>
								<img
									className={styles.active_icon}
									src='./images/icons/active.svg'
									alt='active'
								/>
								<p>
									Active <br /> <span>2</span>
								</p>
							</div>
						</a>
					</div>

					<button
						className={styles.add}
						onClick={() => {
							setAdd(!add)
						}}
					>
						<img
							className={styles.add_icon}
							src='./images/icons/add.svg'
							alt='add'
						/>
						<img
							className={styles.helper}
							src='./images/icons/create_helper.png'
							alt=''
						/>
					</button>
				</div>
			</div>

			<div className={styles.slider}>
				<Slider blocks={courses} />
			</div>

			<div className={styles.tasks}>
				<div className={styles.tasks_header}>
					<img src='./images/icons/meetings.svg' alt='' />
					<h3 className={styles.tasks_title}>Upcoming Meetings</h3>
				</div>

				<div className={styles.tasks_wrapper}>
					{meetings_upcoming.map((task, index) => (
						<div className={styles.task} key={index}>
							<h4 className={styles.task_title}>{task.title}</h4>
							<p className={styles.task_date}>Due {task.date}</p>
						</div>
					))}
				</div>
			</div>

			<div className={styles.tasks}>
				<div className={styles.tasks_header}>
					<img src='./images/icons/overdue_tasks.svg' alt='' />
					<h3 className={styles.tasks_title}>Unchecked Tasks</h3>
				</div>

				<div className={styles.tasks_wrapper}>
					{tasks_upcoming.map((task, index) => (
						<div className={styles.task} key={index}>
							<h4 className={styles.task_title}>{task.title}</h4>
							<p className={styles.task_date}>Due {task.date}</p>
						</div>
					))}
				</div>
			</div>

			{add && (
				<div className={styles.add_wrapper}>
					<h3 className={styles.add_title}>Enter a name for your <br /> study space</h3>

					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							label='Name'
							type='text'
							register={register}
							name='name'
							errors={errors}
						/>

						<button type='submit' className={`${styles.join_button} primary_btn`}>
							Confirm
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Classes
