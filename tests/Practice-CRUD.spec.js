import{test,expect} from '@playwright/test'


test('Create a POST',async({request})=>{


    const response= await request.post('https://jsonplaceholder.typicode.com/posts',{


        data:{

            title: "My Chained Test",
            body:"Learning API chaining",
            userId: 1

        }
 
    })

    expect (response.status()).toBe(201)


    const data= await response.json()

    const postId= data.id


        const getresponse= await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)

        expect(getresponse.status()).toBe(200)

        const getdata= await getresponse.json()

        expect(getdata.id).toBe(postId)

    })
