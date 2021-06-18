const Manager = require("../lib/Manager");

describe("Manager", () => {
    it("can instantiate Employee", () => {
        const employee = new Manager();
        expect(typeof(employee)).toBe("object");
    });

    it("can set values", () => {
        const name = "John";
        const id = "123"
        const email = "email@email.com"
        const phone = "555-555-5555"
        const e = new Manager(name, id, email, phone);
        expect(e.name).toBe("John");
        expect(e.getRole()).toBe("Manager")
        expect(e.officeNumber).toBe("555-555-5555");
    });
})