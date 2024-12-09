import styles from './Grades.module.css'
import { DropList, GradeBar } from '../../components'
import { useState } from 'react'
import PropTypes from 'prop-types'

function Grades({ role }) {
	const periods = [
		'Last 3 days',
		'Last Week',
		'Last Month',
		'Last Quarter',
		'Last Year',
	]

	const subjects = [
		{
			title: 'Design',
			tasks: [
				{
					title: 'Figma Practice',
					date: 'Due Apr 10, Wed',
					progress: 100,
				},
				{
					title: 'Figma Practice',
					date: 'Due Apr 15, Wed',
					progress: 70,
				},
				{
					title: 'Figma Practice',
					date: 'Due Apr 20, Wed',
					progress: 51,
				},
			],
		},
		{
			title: 'Git Basics',
			tasks: [
				{
					title: 'Git Responsibility',
					date: 'Due Apr 10, Wed',
					progress: 91,
				},
				{
					title: 'Git Responsibility',
					date: 'Due Apr 15, Wed',
					progress: 74,
				},
			],
		},
	]

	const uniqueSubjects = ['Subjects', ...subjects.map(subject => subject.title)]
	const [selectedSubject, setSelectedSubject] = useState('Subjects')
	const [openSubject, setOpenSubject] = useState(null) // Стан для відкритого предмета

	const handleSubjectChange = subject => {
		setSelectedSubject(subject)
		setOpenSubject(null) // Закрити завдання при виборі іншого предмета з DropList
	}

	const handleToggleSubject = subjectTitle => {
		// Перемикання стану відкритого предмета
		setOpenSubject(openSubject === subjectTitle ? null : subjectTitle)
	}

	const displayedSubjects =
		selectedSubject === 'Subjects'
			? subjects
			: subjects.filter(subject => subject.title === selectedSubject)

	function getAvg(subject) {
		const sum = subject.tasks.reduce((a, b) => a + b.progress, 0)
		const avg = sum / subject.tasks.length
		return Number(avg.toFixed(1))
	}

	return role === 'student' ? (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.filters}>
					<div style={{ width: '115px' }}>
						<DropList items={uniqueSubjects} onSelect={handleSubjectChange} />
					</div>
					<div style={{ width: '115px' }}>
						<DropList items={periods} />
					</div>
					<p>All grades</p>
				</div>
				<p>Average</p>
			</div>

			<div className={styles.subjects}>
				{displayedSubjects.map((subject, index) => (
					<div key={index} className={styles.subject_wrapper}>
						<div
							className={styles.subject}
							onClick={() => handleToggleSubject(subject.title)}
						>
							<p className={styles.title}>{subject.title}</p>
							<div className={styles.divider}>
								<div className={styles.grade_wrapper}>
									{subject.tasks.map((task, taskIndex) => (
										<div key={taskIndex}>
											<GradeBar progress={task.progress} />
										</div>
									))}
								</div>
								<div className={styles.avg}>
									<GradeBar progress={getAvg(subject)} />
								</div>
							</div>
						</div>

						{openSubject === subject.title && (
							<div className={styles.tasks}>
								{subject.tasks.map((task, taskIndex) => (
									<div
										key={taskIndex}
										className={styles.task}
										style={{
											backgroundColor: (
												index % 2 === 0
													? taskIndex % 2 !== 0
													: taskIndex % 2 === 0
											)
												? '#fff'
												: 'var(--secondary-bg)',
										}}
									>
										<div className={styles.info_wrapper}>
											<span className={styles.number}>{taskIndex + 1}</span>
											<div className={styles.info}>
												<h5 className={styles.title}>{task.title}</h5>
												<p className={styles.date}>{task.date}</p>
											</div>
										</div>
										<GradeBar progress={task.progress} />
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	) : (
		<div></div>
	)
}

Grades.propTypes = {
	role: PropTypes.string,
}

export default Grades
