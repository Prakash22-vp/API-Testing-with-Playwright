import {test,expect} from '@playwright/test'


test('POST API',async({request})=>{

    const loginresponse = await request.post('https://api.example.com/login',{


        data:{

            username: 'testuser',
            password: 'password123'
        }

        
    })

    const data= await loginresponse.json()

    const token= data.accessToken



    const getresponse= await request.get('https://api.example.com/profile',{


        headers:{

            Authorization: `Bearer ${token}`
        }
        
    })

    const profileData = await getresponse.json()

    expect(getresponse .status()).toBe(200)

    expect(profileData ).toHaveProperty("id")



    const getresponse2= await request.get('https://api.example.com/orders',{

        headers:{

            Authorization:`Bearer ${token}`
        }


    })

    expect(getresponse2.status()).toBe(200)

    const ordersResponse= await getresponse2.json()

    expect(ordersResponse).toHaveProperty("id")

})

