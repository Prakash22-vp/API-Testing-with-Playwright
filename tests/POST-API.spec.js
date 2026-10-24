import {test,expect} from '@playwright/test'

test('POST API', async({request})=>{

    const response= await request.post('https://jsonplaceholder.typicode.com/posts',{


        data: {
                title: 'My first API test',
                body: 'Learning Playwright API testing',
                userId: 1
            }
    })

    console.log(response.status())

    expect(response.status()).toBe(201)

    const data= await response.json()

    console.log(data)

    expect(data.userId).toBe(1)

    expect(data.id).toBe(101)

    expect(data.body).toContain("Playwright API")

    

})