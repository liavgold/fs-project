import Posts from "./Posts";

describe("</Posts>", () => {
  it("appName", () => {
    const appName = Posts.name;
    expect(appName).toEqual("Posts");
  });

  it("appRender", () => {
    const appRender = Posts.render;
    expect(appRender).toEqual(undefined);
  });

  it("onCancel", () => {
    const appRender = Posts.onCancel;
    expect(appRender).toEqual(undefined);
  });

  it("onPosts", () => {
    const onPosts = Posts.onPosts;
    expect(onPosts).toEqual(undefined);
  });
});
