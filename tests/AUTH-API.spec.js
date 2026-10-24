import { test, expect } from '@playwright/test';

import { getAccessToken } from './utils/auth';

test('API Login - Get access token', async ({ request }) => {
    const loginresponse = await request.post(
        'https://dummyjson.com/auth/login',
        {
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        }
    );

    expect(loginresponse.status()).toBe(200);

    const data = await loginresponse.json();

    const token= await getAccessToken(request)

    expect(data.accessToken).toBeTruthy();
    

    const response= await request.get('https://dummyjson.com/auth/me',{

        headers:{

            Authorization:`Bearer ${token}`
        }
    })


    expect(response.status()).toBe(200);

    });

   test('API Authentication - Invalid token', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: 'Bearer invalid_token'
            }
        }
    );

    expect(response.status()).toBe(401);
});



    
