import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await axios.post('https://your-cognito-domain/oauth2/token', {
                        grant_type: 'authorization_code',
                        client_id: 'your-client-id',
                        redirect_uri: 'https://your-redirect-uri',
                        code: code,
                    }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    const { id_token } = response.data;

                    // Store the id_token in localStorage
                    localStorage.setItem('id_token', id_token);

                    // Navigate to the dashboard or another page
                    navigate('/dashboard');
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    // Handle error (redirect to login or show an error message)
                }
            }
        };

        exchangeCodeForToken(); // Call the function inside the useEffect

    }, [navigate]); // Add navigate as a dependency

    return <div>Authenticating...</div>;
};

export default AuthHandler;
