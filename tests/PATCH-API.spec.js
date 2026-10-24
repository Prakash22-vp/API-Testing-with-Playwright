import { test, expect } from '@playwright/test';

test('PATCH API - Update post title', async ({ request }) => {
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: 'Updated API test'
            }
        }
    );

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.title).toBe('Updated API test');
    expect(data.id).toBe(1);
});