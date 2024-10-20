import { isCpfValid } from "../isCpfValid";

describe("isCpfValid", () => {
	// Test for valid CPF
	it("should return true for a valid CPF", () => {
		const validCPF = "123.456.789-09"; // Example valid CPF
		expect(isCpfValid(validCPF)).toBe(true);
	});

	// Test for CPF with incorrect length
	it("should return false if CPF has incorrect length", () => {
		const invalidCPF = "1234567890"; // 10 digits instead of 11
		expect(isCpfValid(invalidCPF)).toBe(false);
	});

	// Test for CPF with non-numeric characters
	it("should return false if CPF contains non-numeric characters", () => {
		const invalidCPF = "ABC.DEF.GHI-JK"; // Non-numeric input
		expect(isCpfValid(invalidCPF)).toBe(false);
	});

	// Test for valid CPF with formatting (dots and dashes)
	it("should return true for a valid formatted CPF", () => {
		const validCPF = "111.444.777-35"; // Example valid CPF without formatting
		expect(isCpfValid(validCPF)).toBe(true);
	});

	// Test for invalid CPF (fails the checksum validation)
	it("should return false for an invalid CPF", () => {
		const invalidCPF = "111.444.777-36"; // Example invalid CPF (wrong check digits)
		expect(isCpfValid(invalidCPF)).toBe(false);
	});

	// Test for CPF with repeating digits
	it("should return false for CPF with all the same digits", () => {
		const invalidCPF = "111.111.111-11"; // Invalid CPF with all the same digits
		expect(isCpfValid(invalidCPF)).toBe(false);
	});

	// Test for edge case: Empty string
	it("should return false for an empty string", () => {
		const invalidCPF = "";
		expect(isCpfValid(invalidCPF)).toBe(false);
	});

	// Test for edge case: CPF with special characters but correct digits
	it("should return true for a CPF with special characters stripped out", () => {
		const validCPF = "123.456!789@09"; // Valid CPF with non-standard special characters
		expect(isCpfValid(validCPF)).toBe(true);
	});
});
