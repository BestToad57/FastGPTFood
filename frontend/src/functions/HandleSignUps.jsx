import axios from 'axios';

const HandleSignUp = async ({username, password}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/signup`, {username, password});
        alert(response.data.message);
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
};

export default HandleSignUp;