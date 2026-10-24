import { expect } from '@playwright/test';
 export async function getAccessToken(request){


    const response= await request.post('https://dummyjson.com/auth/login',{

        data:{
         username: 'emilys',
         password: 'emilyspass'
}
    })

expect(response.status()).toBe(200);


const data= await response.json()

const token= data.accessToken

return token
}