import { isCpfValid } from './';

/**
 * Verify if a CPF (Brazilian document) string exists
 * @param string cpf
 * @return null | boolean
 */
export async function cpfExists(cpf: string) {
	if (!isCpfValid(cpf)) {
		return null;
	}

	const _cpf = cpf.replaceAll(/[^0-9]/g, '');

	const url = new URL(
		`public/scpa-usuario/validacao-cpf/${_cpf}`,
		'https://scpa-backend.prod.saude.gov.br',
	);

	try {
		const response = await fetch(url);
		const data: Array<{error: string}> | boolean = await response.json();

		if (typeof data !== 'boolean' && data[0].error !== 'cpf-possui-cadastro-scpa') {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
}
