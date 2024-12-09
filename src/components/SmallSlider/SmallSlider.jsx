import { useRef } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './SmallSlider.module.css'

const SmallSlider = ({ dates, onDateChange }) => {
	const sliderRef = useRef(null)

	const settings = {
		dots: false,
		infinite: false,
		speed: 0,
		slidesToShow: 1,
		slidesToScroll: 2,
		arrows: false,
		afterChange: (current) => onDateChange(dates[current]),
	}

	return (
		<div className={styles.slider_container}>
			<div
				className={styles.custom_prev}
				onClick={() => sliderRef.current.slickPrev()}
			>
				<svg
					width='7'
					height='12'
					viewBox='0 0 7 12'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M6 11L1 6L6 1'
						stroke='#D2D2D2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</div>

			<div
				className={styles.custom_next}
				onClick={() => sliderRef.current.slickNext()}
			>
				<svg
					width='7'
					height='12'
					viewBox='0 0 7 12'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M1 11L6 6L1 1'
						stroke='#D2D2D2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</div>

			<Slider ref={sliderRef} {...settings} className={styles.slider}>
				{dates.map((date, index) => (
					<div key={index} className={styles.date}>
						{date}
					</div>
				))}
			</Slider>
		</div>
	)
}

SmallSlider.propTypes = {
	dates: PropTypes.arrayOf(PropTypes.string).isRequired,
	onDateChange: PropTypes.func.isRequired,
}

export default SmallSlider
