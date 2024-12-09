import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const signUpUser = async (userData) => {
	try {
			const response = await axios.post(`${BASE_URL}/user/sign_up`, userData);
			return response.data;
	} catch (error) {
			console.error('Sign up error:', error);
			throw error;
	}
};

export const logInUser = async (userData) => {
	try {
			const response = await axios.post(`${BASE_URL}/user/log_in`, userData);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('role', response.data.role)
			return response.data;
	} catch (error) {
			console.error('Log in error:', error);
			throw error;
	}
}

export const logOutUser = async () => {
	try {
			const response = await axios.get(`${BASE_URL}/user/log_out`);
			localStorage.removeItem('token');
			localStorage.removeItem('role')
			return response.data;
	} catch (error) {
			console.error('Log out error:', error);
			throw error;
	}
}

export const getPlans = async () => {
	try {
			const response = await axios.get(`${BASE_URL}/plan/get_plans`);
			return response.data;
	} catch (error) {
			console.error('Get plans error:', error);
			throw error;
	}
}

export const createPlan = async (data) => {
	try {
			const response = await axios.post(`${BASE_URL}/plan/create_plan`, data);
			return response.data;
	} catch (error) {
			console.error('Create plan error:', error);
			throw error;
	}
}

export const updatePlan = async (data) => {
	try {
			const response = await axios.put(`${BASE_URL}/plan/update_plan`, data);
			return response.data;
	} catch (error) {
			console.error('Create plan error:', error);
			throw error;
	}
}