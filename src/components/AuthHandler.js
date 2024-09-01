import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const code = new URLSearchParams(window.location.search).get('code');

            try {
                const response = await axios.post('https://contactai.auth.ca-central-1.amazoncognito.com/oauth2/token', {
                    grant_type: 'authorization_code',
                    client_id: '6p6r9ps49qu1ehoom8apsm9jcm',
                    redirect_uri: 'https://main.d2tf8n90uf18rf.amplifyapp.com/dashboard/',
                    code: code,
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                // Store the tokens in localStorage
                localStorage.setItem('id_token', response.data.id_token);

                // Redirect to the dashboard
                navigate('/main'); 
            } catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        };

        exchangeCodeForToken();
    }, [navigate]);

    return <div>Authenticating...</div>;
}

export default AuthHandler;
