describe('render correct content', async () => {
  beforeAll(async () => {
    await goto('/home');
  });

  it('main content', async () => {
    const h1Locator = page.locator('.VPContent h1');
    const h2Locator = page.locator('.VPContent h2');
    const pLocator = page.locator('.VPContent p');

    const [h1Contents, h2Contents, pContents] = await Promise.all([
      h1Locator.allTextContents(),
      h2Locator.allTextContents(),
      pLocator.allTextContents()
    ]);

    expect(h1Contents).toEqual(['Lorem Ipsum \u200B']);
    expect(h2Contents.map(s => s.trim())).toEqual([
      'What is Lorem Ipsum? \u200B',
      'Where does it come from? \u200B',
      'Why do we use it? \u200B',
      'Where can I get some? \u200B'
    ]);
    expect(pContents).toMatchSnapshot();
  });

  it('outline', async () => {
    const outlineLinksLocator = page.locator(
      '.VPDocAsideOutline .root .outline-link'
    );

    const outlineLinksCount = await outlineLinksLocator.count();
    expect(outlineLinksCount).toEqual(4);
  });
});
