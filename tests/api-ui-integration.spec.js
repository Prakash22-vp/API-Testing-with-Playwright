import {test,expect} from '@playwright/test'

test('API - UI Integeration',async({page,request})=>{

    const getresponse= await request.get('https://jsonplaceholder.typicode.com/posts/1')

    expect(getresponse.status()).toBe(200)

    const data= await getresponse.json()

    expect(data).toHaveProperty("id")

    expect(data.id).toBe(1)


    await page.goto("https://example.com")

    await expect(page).toHaveTitle("Example Domain")
})