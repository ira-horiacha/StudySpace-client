import styles from './GradeBar.module.css'
import PropTypes from 'prop-types'

const setColorBar = progress => {
	if (progress < 71) {
		return styles.red_bar
	} else if (progress < 88) {
		return styles.grey_bar
	} else {
		return styles.green_bar
	}
}

function Grade({ progress }) {
	return (
		<div className={`${styles.small_bar} ${setColorBar(progress)}`}>
			{progress}
		</div>
	)
}

Grade.propTypes = {
	progress: PropTypes.number.isRequired,
}

export default Grade
