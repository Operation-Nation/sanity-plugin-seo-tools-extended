import { getYoastInsightsForContent } from "../../src/utils/getYoastInsightsForContent";

jest.mock("yoastseo", () => {
  const mockPaper = jest.fn();
  const mockResearcher = jest.fn();
  const mockJed = jest.fn();
  return {
    Paper: mockPaper,
    Researcher: mockResearcher,
    Jed: mockJed,
    assessments: {},
    helpers: {
      scoreToRating: jest.fn(),
    },
  };
});

describe("getYoastInsightsForContent", () => {
  it("should return insights for SEO and READABILITY categories", () => {
    const html = "<p>This is some HTML content.</p>";
    const options = {
      keyword: "example",
      url: "https://example.com",
      permalink: "/example",
      title: "Example Title",
      synonyms: [],
      description: "Example description",
      langCulture: "en-US",
    };
    const insights = getYoastInsightsForContent(
      require("yoastseo"),
      html,
      options,
    );
    expect(insights).toHaveProperty("seo");
    expect(insights).toHaveProperty("readability");
    expect(insights.seo.length).toBeGreaterThanOrEqual(0);
    expect(insights.readability.length).toBeGreaterThanOrEqual(0);
  });
});
