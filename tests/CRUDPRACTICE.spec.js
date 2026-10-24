import{test,expect} from '@playwright/test'


test('CRUD API', async({request})=>{

    const getresponse= await request.get('https://jsonplaceholder.typicode.com/posts/1')

    expect(getresponse.status()).toBe(200)

    const data= await getresponse.json()


    expect(data.id).toBe(1)

    expect(data.userId).toBe(1)

     expect(data).toHaveProperty("title")


})