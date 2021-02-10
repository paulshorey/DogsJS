const fsOriginal = require("fs");
const fs = fsOriginal.promises;
const SELF_DIR = "tests/";
const TMP_DIR = SELF_DIR + "screenshots";
fs_setup();
const usePort = process.env.USE_PORT || "3005";

/*
 * Test
 */
describe("Dogs page", () => {
  /*
   * Setup
   */
  let sn = 0; // screenshot number
  let innerText = ""; // update innerText after loading new page
  beforeAll(async () => {
    await page.goto(`http://localhost:${usePort}/dogs`);
    innerText = await page.evaluate(() => document.body.textContent);
    // debug screenshot
    await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} initial load.png` });
  });

  /*
   * Crawl
   */
  {
    it('should be titled "All the dogs"', async () => {
      await expect(page.title()).resolves.toMatch("All the dogs");
    });
  }
  {
    it("should contain breeds", async () => {
      expect(innerText).toContain("australian");
    });
  }
  {
    it("should contain sub-breeds", async () => {
      expect(innerText).toContain("shetland");
    });
  }
  {
    let test = it("click Bulldogs, first article should be Boston Bulldog", async () => {
      // click and wait to load next page
      await click_and_wait(page, "main section article:nth-child(16) h3");
      // test
      let title = await page.evaluate(() => document.querySelector("h3").innerText);
      await expect(title).toBe("Boston Bulldog");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it("click English Bulldog, first article should be English Bulldog", async () => {
      // click and wait to load next page
      await click_and_wait(page, "main section article:nth-child(2) img");
      // test
      let title = await page.evaluate(() => document.querySelector("h3").innerText);
      await expect(title).toBe("English Bulldog");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it("click back to Bulldogs, first article should be Boston Bulldog", async () => {
      // click and wait to load next page
      await click_and_wait(page, "header a:nth-child(2)");
      // test
      let title = await page.evaluate(() => document.querySelector("h3").innerText);
      await expect(title).toBe("Boston Bulldog");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it("click back to Home, first article should be Affenpinschers", async () => {
      // click and wait to load next page
      await click_and_wait(page, "header a:nth-child(1)");
      // test
      let title = await page.evaluate(() => document.querySelector("h3").innerText);
      await expect(title).toBe("Affenpinschers");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
});

/*
 * LIB
 */
async function click_and_wait(page, selector) {
  return new Promise(async (resolve) => {
    try {
      let response = await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click(selector) // Clicking the link will indirectly cause a navigation
      ]);
      resolve(response);
    } catch (e) {
      console.error(e);
      resolve(false);
    }
  });
}

async function fs_setup() {
  await fs.rmdir(TMP_DIR, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(`rm ${TMP_DIR}`);
  });
  await fs.mkdir(TMP_DIR);
}
