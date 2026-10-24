import { test, expect } from '@playwright/test';

test('PUT API - Replace post', async ({ request }) => {
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: 'New title',
                body: 'New content',
                userId: 2
            }
        }
    );

    expect (response.status()).toBe(200)

    const data = await response.json();


    expect(data.title).toBe("New title")
    expect(data.body).toBe("New content")
     expect(data.userId).toBe(2)
});