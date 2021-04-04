import Login from "./Login";

describe("</Login>", () => {
  it("appName", () => {
    const appName = Login.name;
    expect(appName).toEqual("Login");
  });

  it("appRender", () => {
    const appRender = Login.render;
    expect(appRender).toEqual(undefined);
  });

  it("onRegister", () => {
    const appRender = Login.onRegister;
    expect(appRender).toEqual(undefined);
  });

  it("onLogin", () => {
    const onLogin = Login.onLogin;
    expect(onLogin).toEqual(undefined);
  });
});
