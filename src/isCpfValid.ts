/**
 * Verify if a CPF (Brazilian document) string is valid
 * @param string cpf
 * @return boolean
 */
export function isCpfValid(cpf: string): boolean {
	const _cpf = cpf.replaceAll(/[^0-9]/g, '');

	if (_cpf.length !== 11) {
		return false;
	}

  if (new Set([..._cpf]).size === 1) {
    return false;
  }

	for (let t = 9; t < 11; t++) {
		let d = 0;
		let c = 0;

		for (; c < t; c++) {
			d += Number(_cpf.charAt(c)) * (t + 1 - c);
		}

		d = ((10 * d) % 11) % 10;

		if (Number(_cpf.charAt(c)) !== d) {
			return false;
		}
	}

	return true;
}
