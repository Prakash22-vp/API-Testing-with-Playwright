import{test,expect} from '@playwright/test'


test('GET API',async({request})=>{

    const response= await request.get('https://dummyjson.com/products')

    expect(response.status()).toBe(200)

    const data= await response.json()

    expect(Array.isArray(data.products)).toBe(true)

    expect(data.products.length).toBeGreaterThan(0);

    expect(data.products[0]).toHaveProperty("id")

    expect(data.products[0]).toHaveProperty("title")

    expect(typeof data.products[0].title).toBe("string")

    expect(data.products[0].id).toBe(1)

    for(const product of data.products){

        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("title");
        expect( typeof product.title).toBe("string")
        expect(product.dimensions).toHaveProperty("width");
        expect(typeof product.dimensions.width).toBe("number");

        expect(typeof product.price).toBe("number")
        expect(product).toHaveProperty("dimensions");
        expect(product).toHaveProperty("price");
    }

    expect(data.products[0].dimensions.width).toBe(15.14)
})