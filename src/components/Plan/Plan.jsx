import styles from './Plan.module.css'
import PropTypes from 'prop-types'
import { useState } from 'react'
import DropList from '../DropList/DropList'

const getDate = date => {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		weekday: 'short',
	})
}

function Plan({ plan, onCheckboxChange, isNew, onSave, onCancel }) {
	const [isCompleted, setIsCompleted] = useState(plan?.isCompleted || false)
	const [name, setName] = useState(plan?.name || '')
	const [date, setDate] = useState(plan?.date || '')
	const [priority, setPriority] = useState(plan?.priority || 'low')

	const handleSave = () => {
		if (name && date) {
			const [day, month, year] = date.split('.').map(Number);
			const formattedDate = new Date(year, month - 1, day); 
	
			const newPlan = {
				_id: Date.now().toString(),
				name,
				date: formattedDate,
				priority,
				isCompleted,
			};
			onSave(newPlan);
		}
	}

	return (
		<div className={styles.plan}>
			<div className={styles.checkbox_container}>
				<input
					type='checkbox'
					className={styles.checkbox}
					id={`checkbox-${plan?._id || 'new'}`}
					checked={isCompleted}
					onChange={() => {
						setIsCompleted(!isCompleted)
						if (!isNew) {
							onCheckboxChange(plan._id, isCompleted)
						}
					}}
				/>
				<label
					htmlFor={`checkbox-${plan?._id || 'new'}`}
					className={styles.checkboxLabel}
				></label>
			</div>

			<div className={styles.plan_info}>
				{isNew ? (
					<div className={styles.new_plan}>
						<div className={styles.input_wrapper}>
							<input
								type='text'
								placeholder='Plan name'
								value={name}
								onChange={e => setName(e.target.value)}
								className={styles.plan_input}
							/>
							<input
								type='text'
								placeholder='Add date'
								value={date}
								onChange={e => setDate(e.target.value)}
								className={styles.plan_input + ' ' + styles.date_input}
							/>
							<div className={styles.drop_list}>
								<DropList
									items={['low', 'medium', 'high']}
									value={priority}
									onChange={e => setPriority(e.target.value)}
								/>
							</div>
						</div>

						<div className={styles.btn_group}>
							<button onClick={handleSave} className={styles.save_button}>
								<img src="/images/icons/tick.svg" alt="" />
							</button>
							<button onClick={onCancel} className={styles.cancel_button}>
								<img src="/images/icons/cross.svg" alt="" />
							</button>
						</div>
					</div>
				) : (
					<>
						<p className={styles.plan_name}>{name}</p>
						<h5 className={styles.plan_date}>Due {getDate(date)}</h5>
					</>
				)}
			</div>
		</div>
	)
}

Plan.propTypes = {
	plan: PropTypes.object,
	onCheckboxChange: PropTypes.func,
	isNew: PropTypes.bool,
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
}

export default Plan
