import { test, expect } from '@playwright/test';

test('Reuse API token', async ({ request }) => {

    
const token= 'abc123'
    
const getresponse= await request.get('https://api.example.com/profile',{


    headers:{

        Authorization:`Bearer ${token}`
    }
})


const getresponse1= await request.get('https://api.example.com/orders',{

    headers:{

        Authorization:`Bearer ${token}`
    }
})

expect(getresponse.status()).toBe(200)

expect(getresponse1.status()).toBe(200);
    

});