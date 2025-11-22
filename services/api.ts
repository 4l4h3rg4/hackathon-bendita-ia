import { Evidence, Patient, DataRow } from '../types';

const API_URL = 'http://localhost:8000/api';

export const api = {
    async login(username: string, password: string) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    async getEvidence(): Promise<Evidence> {
        const response = await fetch(`${API_URL}/evidence`);
        if (!response.ok) throw new Error('Failed to fetch evidence');
        return response.json();
    },

    async getPatient(id: string): Promise<Patient> {
        const response = await fetch(`${API_URL}/patient/${id}`);
        if (!response.ok) throw new Error('Failed to fetch patient');
        return response.json();
    },

    async getAnonymizationData(): Promise<DataRow[]> {
        const response = await fetch(`${API_URL}/anonymization`);
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
    },

    async getContacts() {
        const response = await fetch(`${API_URL}/contacts`);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        return response.json();
    },

    async getMessages(contactId: string) {
        const response = await fetch(`${API_URL}/messages/${contactId}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
    },

    async sendMessage(contactId: string, text: string) {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contactId, text }),
        });
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
    }
};
