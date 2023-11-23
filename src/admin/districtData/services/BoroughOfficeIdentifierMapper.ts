import { Borough } from "../../../generated/models/Borough.generated";

export function generateOrganizationIdentifier(borough: Borough): string {
	const allowedChars = process.env.ID_CHARSET || "123456789ABCDEFGHJKLMNPQRSTWXYZ";
	let identifier = "O_";
	while (identifier.length < 13) {
		for (const char of borough.toUpperCase()) {
			if (identifier.length >= 13) break;
			if (allowedChars.includes(char)) {
				identifier += char;
			} else {
				identifier += allowedChars[0];
			}
		}
	}

	return identifier;
}
