const { test, expect } = require("@playwright/test");

// Checking that the main page and statistics works
test("Viewing main page and statistics, adding a list", async ({ page }) => {
  // Main page has correct headers and links for registration and login
  await page.goto("/");
  await expect(page).toHaveTitle("WSD project II: quiz webapp");
  await expect(page.getByText("Registration")).toBeVisible();
  await expect(page.getByText("Login")).toBeVisible();
  // main page shows statistics
  await expect(page.getByText("Topics: 1")).toBeVisible();
  await expect(page.getByText("Questions: 0")).toBeVisible();
  await expect(page.getByText("Answers: 0")).toBeVisible();
});

// Adding a Topic, it shows up correctly
test("Adding a topic", async ({ page }) => {
  // Try to access /topics, we get redirected
  await page.goto("/topics")
  // Login
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  // Add a topic
  await page.locator("input[type=text]").type("Test Topic 1");
  await page.locator('text="Add topic"').click();
  // Both topics are now visible on /lists
  await expect(page.getByText("Finnish language")).toBeVisible();
  await expect(page.getByText("Test Topic 1")).toBeVisible();
});

// Populating topic with questions, they show up correctly
test("Adding questions", async ({ page }) => {
  // Go to topic
  await page.goto("/topics/2")
  // Login
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  // Add two questions (here filtering is done in two ways, pick one?)
  await page.goto("/topics/2")
  await page.getByRole("textbox").type("Test Question 1");
  await page.getByTestId("submit_question").click();
  await page.getByTestId("question_text").type("Test Question 2");
  await page.locator('text="Add question"').click();
  // Both topics are now visible on /lists
  await expect(page.getByText("Test Question 1")).toBeVisible();
  await expect(page.getByText("Test Question 2")).toBeVisible();
});

// Can add and delete question answers
test("Adding answer options", async ({ page }) => {
  // Go to question
  await page.goto("/topics/2/questions/1");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics/2/questions/1");
  // Add an answer option
  await page.getByRole("textbox").type("Answer option A");
  await page.locator('text="Add answer option"').click();
  // Option is visible
  await expect(page.getByText("Answer option A")).toBeVisible();
  // Delete option
  await page.locator('text="Delete option"').click();
  // Option is no longer visible
  await expect(page.getByText("Answer option A")).not.toBeVisible();
});

// Can't delete questions with answer options
test("Unable to delete populated question", async ({ page }) => {
  // Go to question
  await page.goto("/topics/2/questions/1");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics/2/questions/1");
  // Add an answer option
  await page.getByRole("textbox").type("Answer option B");
  await page.locator('text="Add answer option"').click();
  // Cant delete
  await expect(page.getByText("Delete question")).not.toBeVisible();
});

// Can delete empty question -> it gets removed
test("Able to delete options and empty question", async ({ page }) => {
  // Go to question
  await page.goto("/topics/2/questions/1");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics/2/questions/1");
  // Delete option 
  await expect(page.getByText("Answer option B")).toBeVisible();
  await page.getByText("Delete option").click();
  await expect(page.getByText("Answer option B")).not.toBeVisible();
  // Now we can delete the question
  await expect(page.getByText("Delete question")).toBeVisible();
  await page.getByText("Delete question").click();
  await page.goto("/topics/2/questions");
  await expect(page.getByText("Answer option B")).not.toBeVisible();
});

// Navbar exists, and takes us to quiz
test("Navbar exists and works", async ({ page }) => {
  // Login. then go to main page
  await page.goto("/topics");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/");
  //navbar exists
  await expect(page.getByText("Main page")).toBeVisible();
  await expect(page.getByText("Quiz")).toHaveCount(2);
  // Head over to quiz
  await page.getByText("Quiz").first().click();
  await expect(page.getByText("Test Topic 1")).toBeVisible();
});

// Quiz page shows correct topics
test("Quiz page shows quiz topics (in order)", async ({ page }) => {
  // Go to topics
  await page.goto("/topics");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  // Add another topic
  await page.locator("input[type=text]").type("Another test topic");
  await page.locator('text="Add topic"').click();
  // Head to quiz
  await page.goto("/quiz");
  // Topics are visible
  await expect(page.getByText("Another test topic")).toBeVisible();
});

// Quiz mode correct answer works
test("Quiz mode correct answer works", async ({ page }) => {
  // Go to finnish language topic
  await page.goto("/topics/1");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics/1");
  // Add a question
  await page.getByRole("textbox").type("Test Question 1");
  await page.getByTestId("submit_question").click();
  // Head over to question
  await page.getByText("Test Question 1").click();
  // Add two answer options
  await page.getByRole("textbox").type("Correct answer option");
  await page.locator("input[type=checkbox]").click();
  await page.locator('text="Add answer option"').click();
  await page.getByRole("textbox").type("Incorrect answer option");
  await page.locator('text="Add answer option"').click();
  // Head to quiz
  await page.goto("/quiz");
  // Select "random" question
  await page.getByText("Finnish language").click();
  // Select correct answer
  await page.getByText("Choose").first().click();
  await expect(page.getByText("Correct!")).toBeVisible();
});

// Quiz mode incorrect answer works
test("Quiz mode incorrect answer works", async ({ page }) => {
  // Go to quiz
  await page.goto("/quiz");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/quiz");
  // Head over to question
  await page.getByText("Finnish language").click();
  // Select incorrect answer
  await page.getByText("Choose").nth(1).click();
  await expect(page.getByText("Incorrect!")).toBeVisible();
});





/**const { test, expect } = require("@playwright/test");

test("Adding shopping lists", async ({ page }) => {
  // Add another list
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Test list 2");
  await page.locator('text="Add list"').click();
  // Both lists are now visible on /lists
  await expect(page.getByText("Test list 1")).toBeVisible();
  await expect(page.getByText("Test list 2")).toBeVisible();
});

test("Adding and viewing items", async ({ page }) => {
  // Add a third list and an item to it
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Test list 3");
  await page.locator('text="Add list"').click();
  await page.goto("/lists/3");
  await page.locator("input[type=text]").type("TestItem1");
  await page.locator('text="Add to list"').click();
  await expect(page.getByText("TestItem1")).toBeVisible();
});

test("Marking items as collected", async ({ page }) => {
  // mark testitem1 as collected, check that it is found in a del element
  await page.goto("/lists/3");
  await page.locator('text="Mark collected!"').click();
  await expect(page.locator("del")).toHaveText("TestItem1")
});

test("Deactivating lists", async ({ page }) => {
  // deactivate list 2 and check that it doesn't show on the /lists page
  await page.goto("/lists");
  await page.locator('text="Deactivate list!"').locator('nth=1').click();
  await expect(page.getByText("Test list 2")).toBeHidden();
  await expect(page.getByText("Test list 1")).toBeVisible();
  await expect(page.getByText("Test list 3")).toBeVisible();
});
 */