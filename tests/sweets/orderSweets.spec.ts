import {expect, Page, test} from "@playwright/test";

async function addSweets(index: number, page: Page) {
    await page.locator('xpath=//a[@data-id="'+index+'"]').click();
    await page.locator('xpath=//a[@data-id="'+index+'"]').click();
    await page.locator('xpath=//a[@data-id="'+index+'"]').click();
    await page.locator('xpath=//a[@data-id="'+index+'"]').click();
}

async function evaluateSweetCost(index: number, page: Page) {
    const priceOfSweetString = await page.locator('xpath=//small[@class="text-muted"]').nth(index).textContent();
    const priceOfSweet = parseFloat(priceOfSweetString.replace(/£/g, ""));
    return (priceOfSweet * 4).toFixed(2);
}

test('Start session and navigate to the sweets shop', async ({page}) => {
    await page.goto('https://sweetshop.netlify.app/');

    // Add sweets to basket

    // Evaluate cost of the first sweets
    const firstSum = await evaluateSweetCost(0, page);

    // Add first sweet
    await addSweets(1, page);

    // Evaluate cost of the second sweets
    const secondSum = await evaluateSweetCost(1, page);

    // Add second sweet
    await addSweets(2, page);

    // Evaluate cost of the third sweets
    const thirdSum = await evaluateSweetCost(2, page);

    // Add third sweet
    await addSweets(3, page);

    // Evaluate cost of the fourth sweets
    const fourthSum = await evaluateSweetCost(3, page);

    // Add fourth sweet
    await addSweets(4, page);

    // Sum costs of all sweets
    const checkoutSum = (Number(firstSum) + Number(secondSum) + Number(thirdSum) + Number(fourthSum)).toFixed(2);

    // Navigate to basket
    await page.locator('xpath=//a[@href="/basket"]').click();
    const basketCost = await page.locator('xpath=//ul[@id="basketItems"]/li/strong').textContent();
    const basketCostDefault = parseFloat(basketCost.replace(/£/g, "")).toFixed(2);

    // Check the cost equality
    expect(basketCostDefault).toEqual(checkoutSum);

    // Change delivery type
    const standardShipping = await page.locator('xpath=//input[@id="exampleRadios2"]');
    await standardShipping.check(); // This method is starting the infinite loop
    const shippingCost = parseFloat(standardShipping.getAttribute('value')).toFixed(2);
    const finalCheckoutSum = Number(basketCostDefault) + Number(shippingCost);
    const basketCostFinal = parseFloat(basketCost.replace(/£/g, "")).toFixed(2);

    //Validate sum is changed
    expect(basketCostFinal).toEqual(finalCheckoutSum);

    // Fill payment information
    await page.locator('xpath=//input[@id="name"]').first().fill('Vasya');
    await page.locator('xpath=//input[@id="name"]').nth(1).fill('Pupkin');
    await page.locator('xpath=//input[@id="email"]').fill('vpupkin@dot.com');
    await page.locator('xpath=//input[@id="address"]').fill('1234 Main St');
    await page.locator('xpath=//select[@id="country"]').selectOption('United Kingdom');
    await page.locator('xpath=//select[@id="city"]').selectOption('Cardiff');
    await page.locator('xpath=//input[@id="zip"]').fill('12345');
    await page.locator('xpath=//input[@id="cc-name"]').fill('Visa');
    await page.locator('xpath=//input[@id="cc-number"]').fill('1234567890123456');
    await page.locator('xpath=//input[@id="cc-expiration"]').fill('01/31');
    await page.locator('xpath=//input[@id="cc-ccv"]').fill('123');
    await page.locator('xpzth=//button[contains(@class, "btn-primary")]').click();

    // Finish session
    await page.close();
});