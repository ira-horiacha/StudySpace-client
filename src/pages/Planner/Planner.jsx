import { useEffect, useState } from 'react'
import { createPlan, getPlans, updatePlan } from '../../api'
import styles from './Planner.module.css'
import { Plan } from '../../components'

function Planner() {
	const [plans, setPlans] = useState([])
	const [newPlanMode, setNewPlanMode] = useState(false)
	const [filter, setFilter] = useState('all')

	const today = new Date()
	const todayStart = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	)
	const todayEnd = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 1
	)

	useEffect(() => {
		const fetchPlans = async () => {
			try {
				const plansData = await getPlans()
				setPlans(plansData)
			} catch (error) {
				console.error('Error fetching plans:', error)
			}
		}
		fetchPlans()
	}, [])

	const handleCheckboxChange = async (planId, currentStatus) => {
		try {
			const updatedPlans = plans.map(plan =>
				plan._id === planId ? { ...plan, isCompleted: !currentStatus } : plan
			)
			setPlans(updatedPlans)

			await updatePlan({ id: planId, isCompleted: !currentStatus })
		} catch (error) {
			console.error('Error updating plan:', error)
		}
	}

	const handleAddButtonClick = () => {
		setNewPlanMode(true)
	}

	const handleAddNewPlan = async newPlan => {
		setPlans([...plans, newPlan])
		await createPlan(newPlan)
		setNewPlanMode(false)
	}

	const getAmt = filter => {
		switch (filter) {
			case 'today':
				return plans.filter(plan => {
					const planDate = new Date(plan.date)
					return planDate >= todayStart && planDate < todayEnd
				}).length

			case 'completed':
				return plans.filter(plan => plan.isCompleted).length

			case 'scheduled':
				return plans.filter(plan => !plan.isCompleted).length

			case 'all':
				return plans.length

			default:
				return 0
		}
	}

	const filteredPlans = plans.filter(plan => {
		switch (filter) {
			case 'today': {
				const planDate = new Date(plan.date)
				return planDate >= todayStart && planDate < todayEnd
			}
			case 'completed':
				return plan.isCompleted
			case 'scheduled':
				return !plan.isCompleted
			case 'all':
			default:
				return true
		}
	})

	return (
		<div className={styles.container}>
			<div className={styles.planner_container}>
				<div className={styles.planner_header}>
					<h2>My Planner</h2>

					<div className={styles.btn_group}>
						<button>
							<img src='/images/icons/more.svg' alt='' />
						</button>
						<button onClick={handleAddButtonClick}>
							<img src='/images/icons/add.svg' alt='Add new plan' />
						</button>
					</div>
				</div>

				<div className={styles.planner_content}>
					{filteredPlans.map(plan => (
						<Plan
							key={plan._id}
							plan={plan}
							onCheckboxChange={handleCheckboxChange}
						/>
					))}

					{newPlanMode && (
						<Plan
							isNew
							onSave={handleAddNewPlan}
							onCancel={() => setNewPlanMode(false)}
						/>
					)}
				</div>
			</div>

			<div className={styles.filter_container}>
				<div
					className={`${styles.filter} ${
						filter === 'today' ? styles.active : ''
					}`}
					onClick={() => setFilter('today')}
				>
					<p>Today</p>
					<span>{getAmt('today')}</span>
				</div>

				<div
					className={`${styles.filter} ${
						filter === 'all' ? styles.active : ''
					}`}
					onClick={() => setFilter('all')}
				>
					<p>All</p>
					<span>{getAmt('all')}</span>
				</div>

				<div
					className={`${styles.filter} ${
						filter === 'scheduled' ? styles.active : ''
					}`}
					onClick={() => setFilter('scheduled')}
				>
					<p>Scheduled</p>
					<span>{getAmt('scheduled')}</span>
				</div>

				<div
					className={`${styles.filter} ${
						filter === 'completed' ? styles.active : ''
					}`}
					onClick={() => setFilter('completed')}
				>
					<p>Completed</p>
					<span>{getAmt('completed')}</span>
				</div>
			</div>
		</div>
	)
}

export default Planner
