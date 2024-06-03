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
    const projectName = await page.locator('[data-test="project-card-dlt-29"]').click()
    
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
    await page.locator('uc-collapse-item', {hasText: "Essentials"}).getByRole('textbox', {name: "Title"}).hover()
    await page.mouse.down();
    await page.locator('.uc-content-layout').hover();
    await page.mouse.up();
  });
  



