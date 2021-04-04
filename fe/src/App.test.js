import { render, screen } from '@testing-library/react';
import App from './App';

describe("</App>", () => {
  it("appName", () => {
    const appName = App.name
    expect(appName).toEqual("App");
  });

    it("appRender", () => {
      const appRender = App.render;
      expect(appRender).toEqual(undefined);
    });
});
