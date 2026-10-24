import {test,expect} from '@playwright/test'


test('POST API PRACTICE',async({request})=>{


const response= await request.post('https://jsonplaceholder.typicode.com/posts',{


    data:{

                title: 'Learning CRUD',
                body: 'Practising API testing',
                userId: 1
    }
})


expect(response.status()).toBe(201)

const data=await response.json()

expect(data.userId).toBe(1)

expect(data.id).toBe(101)

  expect(data.title).toBe('Learning CRUD');
    expect(data.body).toBe('Practising API testing');


})

test('CRUD - Read a POST (GET)',async({request})=>{

  const response= await request.get('https://jsonplaceholder.typicode.com/posts/1',);

  expect(response.status()).toBe(200)

   const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.userId).toBe(1);
    expect(data.title).toBeTruthy();


})




test('CRUD - Update a post', async ({ request }) => {
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: 'Updated Playwright title'
            }
        }
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.title).toBe('Updated Playwright title');
});



test('CRUD - Delete a post', async ({ request }) => {
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);
});


