
import { test, expect } from '@playwright/test';

test('Login through API and access protected endpoint', async ({ request }) => {
    // Step 1: Login through API
    const loginResponse = await request.post(
        'https://www.qapractice.com/api/auth/login',
        {
            data: {
                username: 'testuser',
                password: 'Password123'
            }
        }
    );

    expect(loginResponse.status()).toBe(200);

    
const loginData = await loginResponse.json();
const token = loginData.token;

console.log('Token received:', Boolean(token));
console.log('Token type:', loginData.tokenType);

const userResponse = await request.get(
    'https://www.qapractice.com/api/users/1',
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

console.log('Protected API status:', userResponse.status());
console.log('Protected API response:', await userResponse.text());

});
