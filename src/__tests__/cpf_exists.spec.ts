import { cpfExists, isCpfValid } from '..';

// Mocking `isCpfValid` and `fetch`
jest.mock('../isCpfValid');

global.fetch = jest.fn(); // Mocking the global fetch function

describe('cpfExists', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to prevent interference
  });

  it('should return null if the CPF is invalid', async () => {
    // Mocking isCpfValid to return false
    (isCpfValid as jest.Mock).mockReturnValue(false);

    const result = await cpfExists('invalidCPF');

    expect(result).toBeNull();
    expect(isCpfValid).toHaveBeenCalledWith('invalidCPF');
  });

  it('should make a fetch call with the correct URL if the CPF is valid', async () => {
    (isCpfValid as jest.Mock).mockReturnValue(true);

    // Mocking the fetch response
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(true),
    });

    const cpf = '070.680.938-68';
    const result = await cpfExists(cpf);

    const expectedUrl = 'https://scpa-backend.prod.saude.gov.br/public/scpa-usuario/validacao-cpf/07068093868';

    expect(fetch).toHaveBeenCalledWith(new URL(expectedUrl));
    expect(result).toBe(true);
  });

  it('should return false if the response is not a boolean', async () => {
    (isCpfValid as jest.Mock).mockReturnValue(true);

    // Mocking the fetch response to return an object instead of a boolean
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ some: 'data' }),
    });

    const result = await cpfExists('123.456.789-09');

    expect(result).toBe(false);
  });

  it('should return false if fetch throws an error', async () => {
    (isCpfValid as jest.Mock).mockReturnValue(true);

    // Mocking fetch to throw an error
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await cpfExists('123.456.789-09');

    expect(result).toBe(false);
  });

  it('should return false if response is false', async () => {
    (isCpfValid as jest.Mock).mockReturnValue(true);

    // Mocking fetch to return false
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(false),
    });

    const result = await cpfExists('123.456.789-09');

    expect(result).toBe(false);
  });
});
