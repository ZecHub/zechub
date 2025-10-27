import axios from 'axios';
const baseURI = 'http://localhost:3001';

class HttpCommons {
    constructor(foo) {
        this.axiosInstance = axios.create({
            baseURL: baseURI,
            timeout: 5000, // Optional: Set a timeout for the requests
            withCredentials: true, // Required to include cookies in requests
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async get(endpoint, params = {}) {
        try {
            const response = await this.axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data) {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async put(endpoint, data) {
        try {
            const response = await this.axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete(endpoint) {
        try {
            const response = await this.axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No Response:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
    }
}

export default HttpCommons;
