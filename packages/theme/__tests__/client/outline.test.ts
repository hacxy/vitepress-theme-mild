import { resolveHeaders } from '../../src/client/utils/client/outline.ts';

const element = {
  classList: {
    contains: () => false
  }
} as unknown as HTMLHeadElement;

describe('client/theme-default/composables/outline', () => {
  describe('resolveHeader', () => {
    it('levels range', () => {
      expect(
        resolveHeaders(
          [
            {
              level: 2,
              title: 'h2 - 1',
              link: '#h2-1',
              element
            },
            {
              level: 3,
              title: 'h3 - 1',
              link: '#h3-1',
              element
            }
          ],
          [2, 3]
        )
      ).toEqual([
        {
          level: 2,
          title: 'h2 - 1',
          link: '#h2-1',
          children: [
            {
              level: 3,
              title: 'h3 - 1',
              link: '#h3-1',
              children: [],
              element
            }
          ],
          element
        }
      ]);
    });

    it('specific level', () => {
      expect(
        resolveHeaders(
          [
            {
              level: 2,
              title: 'h2 - 1',
              link: '#h2-1',
              element
            },
            {
              level: 3,
              title: 'h3 - 1',
              link: '#h3-1',
              element
            }
          ],
          2
        )
      ).toEqual([
        {
          level: 2,
          title: 'h2 - 1',
          link: '#h2-1',
          children: [],
          element
        }
      ]);
    });

    it('complex deep', () => {
      expect(
        resolveHeaders(
          [
            {
              level: 2,
              title: 'h2 - 1',
              link: '#h2-1',
              element
            },
            {
              level: 3,
              title: 'h3 - 1',
              link: '#h3-1',
              element
            },
            {
              level: 4,
              title: 'h4 - 1',
              link: '#h4-1',
              element
            },
            {
              level: 3,
              title: 'h3 - 2',
              link: '#h3-2',
              element
            },
            {
              level: 4,
              title: 'h4 - 2',
              link: '#h4-2',
              element
            },
            {
              level: 2,
              title: 'h2 - 2',
              link: '#h2-2',
              element
            },
            {
              level: 3,
              title: 'h3 - 3',
              link: '#h3-3',
              element
            },
            {
              level: 4,
              title: 'h4 - 3',
              link: '#h4-3',
              element
            }
          ],
          'deep'
        )
      ).toEqual([
        {
          level: 2,
          title: 'h2 - 1',
          link: '#h2-1',
          children: [
            {
              level: 3,
              title: 'h3 - 1',
              link: '#h3-1',
              children: [
                {
                  level: 4,
                  title: 'h4 - 1',
                  link: '#h4-1',
                  children: [],
                  element
                }
              ],
              element
            },
            {
              level: 3,
              title: 'h3 - 2',
              link: '#h3-2',
              children: [
                {
                  level: 4,
                  title: 'h4 - 2',
                  link: '#h4-2',
                  children: [],
                  element
                }
              ],
              element
            }
          ],
          element
        },
        {
          level: 2,
          title: 'h2 - 2',
          link: '#h2-2',
          children: [
            {
              level: 3,
              title: 'h3 - 3',
              link: '#h3-3',
              children: [
                {
                  level: 4,
                  title: 'h4 - 3',
                  link: '#h4-3',
                  children: [],
                  element
                }
              ],
              element
            }
          ],
          element
        }
      ]);
    });
  });
});
