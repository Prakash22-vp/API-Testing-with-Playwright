import { test, expect, request } from '@playwright/test';

import { login } from './utils/KSMACCAUTH';


test ('UserManagement API',async({request})=>{


    const token= await login(request)

    const response= await request.post('https://apigateway.ksmacc.in/admin/userManagementDetails',{


        headers:{

            Authorization: `Bearer ${token}`
        },

        data:{
  
            "companyID":2012

}
        
    })


 expect(response.status()).toBe(200);
})
