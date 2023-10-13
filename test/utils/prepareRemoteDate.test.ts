/**
 * @jest-environment jsdom
 */
import { prepareRemoteData } from '../../src/utils/prepareRemoteData';

describe('prepareRemoteData', () => {
  it('should fetch and prepare data correctly with default options', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      text: jest
        .fn()
        .mockResolvedValue(
          '<html><head><title>Test Title</title></head><body><div data-content="seo">Test Content</div></body></html>'
        )
    });
    const url = new URL('https://example.com');
    const options = {};
    const preparedData = await prepareRemoteData(url, options);
    expect(preparedData).toEqual({
      locale: 'en-US',
      title: 'Test Title',
      description: '',
      content: '<div data-content="seo">Test Content</div>'
    });
  });
  it('should fetch and prepare data correctly with custom contentSelector', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      text: jest
        .fn()
        .mockResolvedValue(
          '<html><head><title>Test Title</title></head><body><div class="custom-content">Custom Content</div></body></html>'
        )
    });
    const url = new URL('https://example.com');
    const options = {
      contentSelector: '.custom-content'
    };
    const preparedData = await prepareRemoteData(url, options);
    expect(preparedData).toEqual({
      locale: 'en-US',
      title: 'Test Title',
      description: '',
      content: 'Custom Content'
    });
  });
});
