const Intern = require("../lib/Intern");

describe("Intern", () => {
    it("can instantiate Employee", () => {
        const employee = new Intern();
        expect(typeof(employee)).toBe("object");
    });

    it("can set values", () => {
        const name = "John";
        const id = "123"
        const email = "email@email.com"
        const school = "university"
        const e = new Intern(name, id, email, school);
        expect(e.name).toBe("John");
        expect(e.getRole()).toBe("Intern")
        expect(e.school).toBe("university");
    });
})