import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

test('navigation', async ({ context }) => {
    const page = await context.newPage()   
    await page.goto('https://dashboard.ucraft.ai');
    
    const emailField = page.getByLabel("Email")
    const passwordField = page.getByLabel("Password")
    
    await emailField.fill("arman@ucraft.com")
    await passwordField.fill('Qw123456@')
    await page.getByRole('button', {name: "Sign In", exact: true}).click()
    
    // assertion 
    const response = await page.request.get('https://dashboard.ucraft.ai');
    await expect(response).toBeOK()

    // project selection
    const projectName = await page.locator('[data-test="project-card-2230"]').click()
    
    // assertion
    await expect(page).toHaveURL(new RegExp('/dashboard'))       
    
    // navigating to VE
    const newTab = context.waitForEvent('page')
    const navigateToVisualButton = await page.getByRole('tab', {name: "Design", exact: true}).click()
    
    const newPage = await newTab;

    // asserion
    await expect(newPage).toHaveURL(new RegExp('/visual-editor'))
    await newPage.locator('[data-test="left-panel-bar-widgets"]').click()
    
    // item drag & drop
    const iframe = newPage.frameLocator('.sc-dsAqUS') 
    await newPage.locator('.uc-collapse-item', {hasText: "Essentials"}).locator('[data-test="widget-item-left-bar-widgets"]').first().dragTo(iframe.locator('.Layout__Content-sc-7bsglr-3'))
  });



