import { useState } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Slider.module.css'

const CustomSlider = ({ blocks }) => {
	const [currentSlide, setCurrentSlide] = useState(1)
	const totalSlides = Math.ceil(blocks.length / 2)

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: false,
		beforeChange: (oldIndex, newIndex) => {
			setCurrentSlide(newIndex / 2 + 1)
		},
	}

	let sliderRef

	const getFilledBalls = progress => {
		const filledBalls = Math.floor((progress / 100) * 6)
		return filledBalls
	}

	return (
		<div className={styles.slider_container}>
			<div className={styles.pagination_wrapper}>
				<div
					className={styles.custom_prev}
					onClick={() => sliderRef.slickPrev()}
				>
					<svg
						width='10'
						height='19'
						viewBox='0 0 12 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11 1L1.76316 9.775C1.34816 10.1693 1.34816 10.8307 1.76316 11.225L11 20'
							stroke='#9C9C9C'
							strokeWidth='1.5'
						/>
					</svg>
				</div>

				<div className={styles.pagination}>
					<span className={styles.current}>0{currentSlide}</span>
					<div className={styles.line}></div>
					<span>0{totalSlides}</span>
				</div>

				<div
					className={styles.custom_next}
					onClick={() => sliderRef.slickNext()}
				>
					<svg
						width='10'
						height='19'
						viewBox='0 0 12 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M1 1L10.2368 9.775C10.6518 10.1693 10.6518 10.8307 10.2368 11.225L1 20'
							stroke='#9C9C9C'
							strokeWidth='1.5'
						/>
					</svg>
				</div>
			</div>

			<Slider ref={slider => (sliderRef = slider)} {...settings}>
				{blocks.map((block, index) => (
					<div key={index} className={styles.slider_block}>
						<div className={styles.slider_header}>
							<h4>{block.title}</h4>
							<p className={styles.description}>{block.description}</p>
						</div>
						<div className={styles.slider_progress}>
							<p className={styles.progress_text}>{`${block.progress}%`}</p>
							<div className={styles.ball_container}>
								{[...Array(6)].map((_, i) => (
									<div
										key={i}
										className={`${styles.ball} ${
											i < getFilledBalls(block.progress) ? styles.filled : ''
										}`}
									></div>
								))}
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

CustomSlider.propTypes = {
	blocks: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			progress: PropTypes.number.isRequired,
		})
	).isRequired,
}

export default CustomSlider
