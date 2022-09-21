const login = Math.random().toString(36).substr(2, 5);
const password = "TestPass";
const firstname = Math.random().toString(36).substr(2, 5);
const lastname = Math.random().toString(36).substr(2, 5);
const email = Math.random().toString(36).substr(2, 5) + "@laluxy.com";
const username = Math.random().toString(36).substr(2, 5);
const selectLanguage = "uk";

import { test, expect } from "@playwright/test";
test.describe("redmine.org", () => {
  test("Positive Test: Sign Up with valid credentionals /#1", async ({
    page, context
  }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto("https://www.redmine.org/");

    await page.locator('a[href^="/account"]').click();

    await expect(page).toHaveURL("/account/register");

    
    await page.locator('input[id$="login"]').click();
    await expect(page.locator('input[id$="login"]')).toBeFocused();
    await page.locator('input[id$="login"]').fill(login);

    
    await page.locator('input[id$="password"]').click();
    await expect(page.locator('input[id$="password"]')).toBeFocused();
    await page.locator('input[id$="password"]').fill(password);

    await page.locator('input[id$="confirmation"]').click();
    await expect(page.locator('input[id$="confirmation"]')).toBeFocused();
    await page.locator('input[id$="confirmation"]').fill(password);

    await page.locator('input[id*="firstname"]').click();
    await expect(page.locator('input[id*="firstname"]')).toBeFocused();
    await page.locator('input[id*="firstname"]').fill(firstname);

    await page.locator('input[id*="lastname"]').click();
    await expect(page.locator('input[id*="lastname"]')).toBeFocused();
    await page.locator('input[id*="lastname"]').fill(lastname);

    await page.locator('input[id*="mail"]').click();
    await expect(page.locator('input[id*="mail"]')).toBeFocused();
    await page.locator('input[id*="mail"]').fill(email);

    await page.locator('select[id*="language"]').selectOption(selectLanguage);

    await page.locator('input[id^="user_custom"]').click();
    await expect(page.locator('input[id^="user_custom"]')).toBeFocused();
    await page.locator('input[id^="user_custom"]').fill(username);

    await page.locator('input[name="commit"]').click();    

    await expect(page).toHaveURL("/login");

    const text = page.locator('div[id*="flash"]');
    await expect(text).toHaveText(["Account was successfully created. An email containing the instructions to activate your account was sent to ",] + email + ".");


    await page.locator('div[id*="flash"]').screenshot({ path: "screenshots/accountWasSuccessCreated.png" });

    await context.tracing.stop({ path: "trace/signUpWithValidData.zip" });
  });




  test("Negative Test: Sign Up user with already existing data /#2", async ({
    page, context
  }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto("https://www.redmine.org/");

    await page.locator('a[href^="/account"]').click();

    await expect(page).toHaveURL("/account/register");

    await page.locator('input[id$="login"]').click();
    await expect(page.locator('input[id$="login"]')).toBeFocused();
    await page.locator('input[id$="login"]').fill("TestUserForR");

    await page.locator('input[id$="password"]').click();
    await expect(page.locator('input[id$="password"]')).toBeFocused();
    await page.locator('input[id$="password"]').fill("TestPass");

    await page.locator('input[id$="confirmation"]').click();
    await expect(page.locator('input[id$="confirmation"]')).toBeFocused();
    await page.locator('input[id$="confirmation"]').fill("TestPass");

    await page.locator('input[id*="firstname"]').click();
    await expect(page.locator('input[id*="firstname"]')).toBeFocused();
    await page.locator('input[id*="firstname"]').fill("Test");

    await page.locator('input[id*="lastname"]').click();
    await expect(page.locator('input[id*="lastname"]')).toBeFocused();
    await page.locator('input[id*="lastname"]').fill("User");

    await page.locator('input[id*="mail"]').click();
    await expect(page.locator('input[id*="mail"]')).toBeFocused();
    await page.locator('input[id*="mail"]').fill("demotij312@laluxy.com");

    await page.locator('select[id*="language"]').selectOption("uk");

    await page.locator('input[id^="user_custom"]').click();
    await expect(page.locator('input[id^="user_custom"]')).toBeFocused();
    await page.locator('input[id^="user_custom"]').fill("NewTestUser");

    await page.locator('input[name="commit"]').click();
    await page.waitForTimeout(3000);

    const locator = page.locator("#errorExplanation");
    await expect(locator).toBeVisible();
    await page.locator("#errorExplanation").screenshot({ path: "screenshots/signUpUseErrorExplanation.png" });

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL("/account/register");

    await context.tracing.stop({ path: "trace/signUpWithExistingData.zip" });
  });

  test("Negative Test: Sign In Test with invalid data /#3", async ({
    page,
    context,
  }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto("https://www.redmine.org/");

    await page.locator(".login").click();
    await expect(page).toHaveURL("/login");

    await page.locator('input[id$="name"]').click();
    await expect(page.locator('input[id$="name"]')).toBeFocused();
    await page.locator('input[id$="name"]').fill("TestUserForR");

    await page.locator('input[id^="pass"]').click();
    await expect(page.locator('input[id^="pass"]')).toBeFocused();
    await page.locator('input[id^="pass"]').fill("TestPass");

    await page.locator('input[id^="autolog"]').isEnabled();
    await page.locator('input[id^="autolog"]').click();
    

    await page.locator('input[name="login"]').click();
    await expect(page).toHaveURL("/login");

    const error = page.locator('[id$="error"]');
    await expect(error).toBeVisible();
    await page.locator('[id$="error"]').screenshot({ path: "screenshots/signInError.png" });
    
    await context.tracing.stop({ path: "trace/negativeSignIn.zip" });
  });

  test("Negative Test: Password recovery with invalid email /#4", async ({
    page, context
  }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    await page.goto("https://www.redmine.org/");

    
    await page.locator(".login").click();
    await expect(page).toHaveURL("/login");

    
    await page.locator('a[href*="lost_pass"]').click();
    await expect(page).toHaveURL("/account/lost_password");

   
    await page.locator("#mail").click();
    await expect(page.locator("#mail")).toBeFocused();
    await page.locator("#mail").fill("TestUser@ukr.net");

   
    await page.locator('input[type*="sub"]').click();
    await expect(page).toHaveURL("/account/lost_password");

    
    await page.locator('div[class="flash error"]').isVisible();
    await page
      .locator('div[class="flash error"]')
      .screenshot({ path: "screenshots/passwordRecoveryUnknownUser.png" });

      await context.tracing.stop({ path: "trace/recoveryPassWithInvalidEmail.zip" });
  });


  test("Positive Test: Site search /#5", async ({
    page, context
  }) => { 
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto('https://www.redmine.org/');

 
    await page.locator('[id="q"]').click();
    await expect(page.locator('[id="q"]')).toBeFocused();
    await page.locator('[id="q"]').fill('Changelog'); 
    await page.locator('input[name="q"]').press('Enter');

    await page.waitForURL('/projects/redmine/search?utf8=%E2%9C%93&wiki_pages=1&q=Changelog');

    await page.locator('[id$="per2"]').screenshot({ path: "screenshots/searchResult.png" });


    await page.locator('div > h3').isVisible();


    await page.locator('input[name="issues"]').click();


    await page.locator('[name="commit"]').click();
    await page.waitForURL('projects/redmine/search?utf8=%E2%9C%93&q=Changelog&scope=&all_words=&all_words=1&titles_only=&issues=1&wiki_pages=1&commit=Submit');

 
    await page.locator('[id="search-input"]').click();
    await expect(page.locator('[id="search-input"]')).toBeFocused();
    await page.locator('[id="search-input"]').fill('37226');


    await page.locator('[name="commit"]').click();
    await page.waitForURL('/issues/37226');

    const text = page.locator('div > h2');
    await expect(text).toHaveText(["Defect #37226"]);


    await page.locator('[id$="per2"]').screenshot({ path: "screenshots/searchIssuePostResult.png" });  

    await context.tracing.stop({ path: "trace/siteSearch.zip" });
});   
   
  });