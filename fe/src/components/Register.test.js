import Register from "./Register";

describe("</Register>", () => {
  it("appName", () => {
    const appName = Register.name;
    expect(appName).toEqual("Register");
  });

  it("appRender", () => {
    const appRender = Register.render;
    expect(appRender).toEqual(undefined);
  });

    it("backToLogin", () => {
      const appRender = Register.backToLogin;
      expect(appRender).toEqual(undefined);
    });

    it("onRegister", () => {
          const onRegister = Register.onRegister;
          expect(onRegister).toEqual(undefined);
    });
});
