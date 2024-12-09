import styles from './Dashboard.module.css'
import { DropList, SmallSlider, GradeBar } from '../../components'
import { useState } from 'react'
import PropTypes from 'prop-types'

function Dashboard({ role }) {
	const progress = [100, 88, 75, 72, 43, 51, 68, 78, 99, 49, 89, 92, 77]
	const avg = parseFloat(
		(progress.reduce((a, b) => a + b, 0) / progress.length).toFixed(1)
	)
	const progressDropList = [
		'All',
		'Today',
		'Last Week',
		'LastMonth',
		'Last Year',
	]

	const lastGrades = [
		{
			title: 'Figma Practice',
			progress: 100,
		},
		{
			title: 'Git Basics Test',
			progress: 78,
		},
		{
			title: 'UI|UX Design',
			progress: 51,
		},
		{
			title: 'UI|UX Design',
			progress: 51,
		},
	]

	const schedule = [
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			time: '11:00',
			type: 'Online',
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			time: '11:00',
			type: 'Online',
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			time: '11:00',
			type: 'Online',
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			time: '11:00',
			type: 'Online',
		},
		{
			title: 'Git Basics',
			date: 'Mon, Oct 11',
			time: '12:00',
			type: 'Offline',
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			time: '13:00',
			type: 'Online',
		},
		{
			title: 'Git Basics',
			date: 'Mon, Oct 10',
			time: '14:00',
			type: 'Offline',
		},
	]

	const tasksDropList = ['Today', '3 days', 'This Week']

	const tasks = [
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			points: 100,
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			points: 100,
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			points: 100,
		},
		{
			title: 'UI|UX Design',
			date: 'Mon, Oct 10',
			points: 100,
		},
	]

	const uniqueDates = [...new Set(schedule.map(item => item.date))]
	const [selectedDate, setSelectedDate] = useState(uniqueDates[0])
	const filteredMeets = schedule.filter(meet => meet.date === selectedDate)

	const setColorBlock = progress => {
		if (progress < 71) {
			return styles.red_block
		} else if (progress < 88) {
			return styles.orange_block
		} else {
			return styles.green_block
		}
	}

	return role === 'student' ? (
		<div className={styles.container}>
			<div className={styles.progress}>
				<div className={styles.progress_header + ' ' + styles.header}>
					<div className={styles.progress_title}>
						<h4 className={styles.title}>Progress</h4>
						<GradeBar progress={avg} />
					</div>
					<div className={styles.drop_wrapper}>
						<DropList items={progressDropList} />
					</div>
				</div>

				<div className={styles.progress_bars}>
					{progress.map((progress, index) => (
						<GradeBar key={index} progress={progress} />
					))}
				</div>
			</div>

			<div className={styles.grades}>
				<div className={styles.grades_header + ' ' + styles.header}>
					<h4 className={styles.title}>Latest grades</h4>
				</div>

				<div className={styles.grades_bars}>
					{lastGrades.map((grade, index) => (
						<div
							key={index}
							className={`${styles.grade} ${setColorBlock(grade.progress)}`}
						>
							<h5 className={styles.grade_title}>{grade.title}</h5>
							<div className={`${styles.big_bar}`}>{grade.progress}</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.schedule}>
				<div className={`${styles.schedule_header} ${styles.header}`}>
					<h4 className={styles.title}>Schedule</h4>
					<SmallSlider dates={uniqueDates} onDateChange={setSelectedDate} />
				</div>

				<div className={styles.schedule_meets}>
					{filteredMeets.map((meet, index) => (
						<div key={index} className={styles.task}>
							<div className={styles.task_info}>
								<p className={styles.task_title}>{meet.title}</p>
								<p className={styles.task_time}>{meet.time}</p>
							</div>
							<p className={styles.task_type}>{meet.type}</p>
						</div>
					))}
				</div>
			</div>

			<div className={styles.tasks}>
				<div className={`${styles.tasks_header} ${styles.header}`}>
					<h4 className={styles.title}>Tasks</h4>
					<div className={styles.drop_wrapper}>
						<DropList items={tasksDropList} />
					</div>
				</div>

				<div className={styles.tasks_list}>
					{tasks.map((task, index) => (
						<div key={index} className={styles.task}>
							<div className={styles.task_info}>
								<p className={styles.task_title}>{task.title}</p>
								<p className={styles.task_points}>{task.points} points</p>
							</div>
							<p className={styles.task_date}>{task.date}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<div></div>
	)
}

Dashboard.propTypes = {
	role: PropTypes.string,
}

export default Dashboard
