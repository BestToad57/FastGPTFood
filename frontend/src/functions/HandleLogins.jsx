import axios from 'axios';

const HandleLogins = async (loginData) => {
    try {
        const response = await axios.post('http://localhost:5000/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            return response.data.token;
        }
    } catch (error) {
        alert('Invalid username or password');
        return null;
    }
};

export default HandleLogins;