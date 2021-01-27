describe('Dogs', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:9754/dogs');
  });

  it('should be titled "All the dogs"', async () => {
    await expect(page.title()).resolves.toMatch('All the dogs');
  });
});
