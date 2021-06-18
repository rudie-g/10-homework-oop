const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    it("can instantiate Employee", () => {
        const employee = new Engineer();
        expect(typeof(employee)).toBe("object");
    });

    it("can set values", () => {
        const name = "John";
        const id = "123"
        const email = "email@email.com"
        const github = "john-g"
        const e = new Engineer(name, id, email, github);
        expect(e.name).toBe("John");
        expect(e.getRole()).toBe("Engineer")
        expect(e.github).toBe("john-g");
    });
})