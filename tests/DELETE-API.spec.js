import { test, expect } from '@playwright/test';

test('DELETE API - Delete post', async ({ request }) => {
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);


    const data= response.json()

    console.log(data)
});