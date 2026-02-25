const API_URL = import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const api = {
    // Generic
    get: async (resource) => {
        const response = await fetch(`${API_URL}/${resource}`);
        return handleResponse(response);
    },

    post: async (resource, data) => {
        const response = await fetch(`${API_URL}/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    put: async (resource, id, data) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    delete: async (resource, id) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    }
};

export const endpoints = {
    hardware: 'hardware',
    software: 'software',
    nonIT: 'non-it-assets',
    employees: 'employees',
    tickets: 'tickets',
};
