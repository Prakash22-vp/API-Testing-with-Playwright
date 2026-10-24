
import { getAccessToken } from './auth.js';

export async function getUserProfile(request) {
    const token = await getAccessToken(request);

    const response = await request.get(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}
