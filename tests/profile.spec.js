
import { test, expect } from '@playwright/test';
import { getUserProfile } from '../Utils/profileApi.js';
import { expectStatus } from '../Utils/apiAssertions.js';

test('Verify user profile ID', async ({ request }) => {
    const response = await getUserProfile(request);

    expectStatus(response, 200);

    const data = await response.json();
    expect(data.id).toBe(1);
});

test('Verify user profile username', async ({ request }) => {
    const response = await getUserProfile(request);

    expectStatus(response, 200);

    const data = await response.json();
    expect(data.username).toBe('emilys');
});
