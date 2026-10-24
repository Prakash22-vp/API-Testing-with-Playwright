import {test,expect} from '@playwright/test'
import { request } from 'node:http';

test('GET API RESPONSE',async({request})=>{


    const response= await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect (response.status()).toBe(200)


    const data= await response.json()

    

    expect(data.id).toBe(1)
    expect(data.userId).toBe(1)
    expect(data.title).toBeTruthy();

})


test('Negative Testing', async({request})=>{

    const response= await request.get("https://jsonplaceholder.typicode.com/posts/999999'")


    expect(response.status()).toBe(404)

    const data= await response.json()

    expect(data).toEqual({})
 console.log(data)


 const contentType = response.headers()['content-type'];

 console.log(contentType)

 expect (contentType).toContain("application/json")
   
})