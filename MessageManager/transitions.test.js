const transitions = require("./transitions")
// @ponicode
describe("transitions.default", () => {
    test("0", () => {
        let callFunction = () => {
            transitions.default(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            transitions.default(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            transitions.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
