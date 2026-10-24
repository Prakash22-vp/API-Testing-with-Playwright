import { expect } from '@playwright/test';

export function expectStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
}