import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './DropList.module.css'

const DropList = ({ items, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedItem, setSelectedItem] = useState(items[0])

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const handleSelect = item => {
		setSelectedItem(item)
		setIsOpen(false)
		if (onSelect) {
			onSelect(item)
		}
	}

	return (
		<div className={styles.dropListContainer}>
			<div className={styles.selected} onClick={toggleDropdown}>
				{selectedItem || 'Select an item'}
				<img className={isOpen ? styles.rotate : ''} src='/images/icons/ArrowList.svg' alt='' />
			</div>
			{isOpen && (
				<ul className={styles.dropList}>
					{items.map((item, index) => (
						<li
							key={index}
							className={`${styles.item} ${
								item === selectedItem ? styles.selectedItem : ''
							}`}
							onClick={() => handleSelect(item)}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

DropList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func,
}

export default DropList
