const Employee = require("../lib/Employee");

describe("Employee", () => {
    it("instantiates properly", () => {
        const employee = new Employee();
        expect(typeof(employee))
        .toBe("object");
    });


    it("can set values", () => {
        const id = 123;
        const name = "John"
        const email = "email@email.com"
        const e = new Employee(name, id, email)
        expect(e.name).toBe("John");
        expect(e.id).toBe(123);
        expect(e.email).toBe("email@email.com");
    })
})
