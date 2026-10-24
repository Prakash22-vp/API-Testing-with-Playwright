import { test, expect } from '@playwright/test';

import { validProduct } from '../test-data/productData.js';

import { invalidProductPrice } from '../test-data/productData.js';

import { productPriceCases } from '../test-data/productData.js';

test('Negative Test', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/auth/login',
        {
            data: {
                username: 'emilys',
                password: 'wrongpassword'
            }
        }
    );


    expect(response.status()).toBe(400);

    const data= await response.json()

    console.log(data)

    expect(data.message).toBe("Invalid credentials")


    const response1= await request.post('https://dummyjson.com/auth/login',{


    })
});



test('Missing password', async ({ request }) => {
    const response1= await request.post('https://dummyjson.com/auth/login',{
data: {
    username: 'emilys'
}

    })

    console.log(response1.status());

const data = await response1.json();
console.log(data);


expect(response1.status()).toBe(400)

expect(data.message).toBe("Username and password required")
});



test('Missing Username',async({request})=>{

    const response2= await request.post('https://dummyjson.com/auth/login',{

         data: {
                password: 'emilyspass'
            }
    })

    console.log(response2.status())

    const data= await response2.json()

    console.log(data)

    expect(response2.status()).toBe(400);
expect(data.message).toBe("Username and password required");
})



test('Invalid Datatypes',async({request})=>{

    const response3 = await request.post('https://dummyjson.com/auth/login',{

        data: {
    username: 123,
    password: 'emilyspass'
}
    })


    console.log(response3.status())

    const data= await response3.json()

    console.log(data)

    expect(response3.status()).toBe(400);
expect(data.message).toBe("Username is not valid");

})


test('Invalid Authorization',async({request})=>{

    const response4= await request.get('https://dummyjson.com/auth/me',{

        headers: {
    Authorization: 'Bearer invalidtoken123'
}
    })

    console.log(response4.status())

    const data= await response4.json()

    console.log(data)

    expect(response4.status()).toBe(401);
expect(data.message).toBe("Invalid/Expired Token!");
})


test('Missing Authorization', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/auth/me');

    console.log(response.status());

    const data = await response.json();

    console.log(data);

    expect(response.status()).toBe(401);

expect(data.message).toBe("Access Token is required");
});


test('Empty Username and Password', async ({ request }) => {

    // Send a POST request with empty credentials
    const response = await request.post(
        'https://dummyjson.com/auth/login',
        {
            data: {
                username: '',
                password: ''
            }
        }
    );

    // Check the HTTP status code
    expect(response.status()).toBe(400);

    // Read the response body as JSON
    const data = await response.json();

    // Verify the error message
    expect(data.message).toBe('Username and password required');

    console.log('Status:', response.status());
    console.log('Response:', data);
});



test('Create Product with Invalid Price', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: {
                title: 'Test Product',
                price: -100
            }
        }
    );

    expect(response.status()).toBe(201);

    const data = await response.json();

    expect(data.title).toBe('Test Product');
    expect(data.price).toBe(-100);
    expect(data.id).toBeTruthy();

    console.log('Status:', response.status());
    console.log('Response:', data);
});



test('Create Product Without Title', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: {
                price: 100
            }
        }
    );

    const data = await response.json();

    console.log('Status:', response.status());
    console.log('Response:', data);

    expect(response.status()).toBe(201);
expect(data.id).toBeTruthy();
expect(data.price).toBe(100);
expect(data).not.toHaveProperty('title');
});



test('Create Product with Invalid Price Type', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: {
                title: 'Test Product',
                price: 'one hundred'
            }
        }
    );

    const data = await response.json();

    console.log('Status:', response.status());
    console.log('Response:', data);

    expect(data.title).toBe('Test Product');
    expect(data.price).toBe('one hundred');
    expect(typeof data.price).toBe('string');

  
});



test('Validate Created Product Data Types', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: {
                title: 'Test Product',
                price: 100
            }
        }
    );

    expect(response.status()).toBe(201);

    const data = await response.json();

    // Verify property data types
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
    expect(typeof data.price).toBe('number');

    // Verify the returned values
    expect(data.title).toBe('Test Product');
    expect(data.price).toBe(100);

    console.log('Status:', response.status());
    console.log('Response:', data);
});



test('Create Product Using Test Data', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: validProduct
        }
    );

    expect(response.status()).toBe(201);

    const data = await response.json();

    expect(data.title).toBe(validProduct.title);
    expect(data.price).toBe(validProduct.price);

    console.log('Status:', response.status());
    console.log('Response:', data);
});



test('Create Product Using Invalid Test Data', async ({ request }) => {
    const response = await request.post(
        'https://dummyjson.com/products/add',
        {
            data: invalidProductPrice
        }
    );

    const data = await response.json();

    console.log('Status:', response.status());
    console.log('Response:', data);

    // DummyJSON accepts this input, so verify its observed behavior.
    expect(response.status()).toBe(201);
    expect(data.price).toBe(-100);
});


test('Create Multiple Products Using Test Data', async ({ request }) => {
    for (const product of productPriceCases) {
        const response = await request.post(
            'https://dummyjson.com/products/add',
            {
                data: product
            }
        );

        expect(response.status()).toBe(201);

        const data = await response.json();

        expect(data.title).toBe(product.title);
        expect(data.price).toBe(product.price);

        console.log('Created product:', data);
    }
});


test('Verify API response headers', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products/1'
    );

    // Verify status code
    expect(response.status()).toBe(200);

    // Read response headers
    const headers = response.headers();

    console.log('Content-Type:', headers['content-type']);

    // Verify response content type
    expect(headers['content-type']).toContain('application/json');
});



test('Send custom request headers', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products/1',
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.title).toBeTruthy();
});



test('Validate product response structure', async ({ request }) => {
    const response = await request.get(
        'https://dummyjson.com/products/1'
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    // Validate required properties
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('price');

    // Validate property data types
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
    expect(typeof data.price).toBe('number');
});

test('Verify API using baseURL', async ({ request }) => {
    const response = await request.get('/products/1');

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.title).toBeTruthy();
});

