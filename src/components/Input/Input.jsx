import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Input.module.css';
import eyeShow from '/images/icons/eye-open.svg'; 
import eyeHide from '/images/icons/eye-close.svg'; 

const Input = ({ label, type, register, name, errors }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<label htmlFor={name}>
				{label}
				<span className={styles.required}>*</span>
			</label>
			<div className={styles.inputWrapper}>
				<input
					type={showPassword && type === 'password' ? 'text' : type}
					id={name}
					{...register(name, { required: `${label} is required` })}
					autoComplete={type === 'password' ? 'new-password' : 'off'}
				/>
				{type === 'password' && (
					<button type="button" onClick={togglePasswordVisibility} className={styles.eyeButton}>
						<img src={showPassword ? eyeShow : eyeHide } alt="Toggle password visibility" />
					</button>
				)}
			</div>
			{errors[name] && <span className={styles.errorMessage}>{errors[name].message}</span>}
		</div>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
};

export default Input;
