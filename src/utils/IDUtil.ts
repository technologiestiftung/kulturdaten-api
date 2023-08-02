import { customAlphabet } from "nanoid";


export function generateID(): string {
	const charset = process.env.ID_CHARSET || "123456789ABCDEFGHJKLMNPQRSTWXYZ";
	const length = parseInt(process.env.ID_LENGTH || '12');
	const nanoid = customAlphabet(charset, length)
	return nanoid();
} 

export function generateAttractionID() : string {
	return "A_" + generateID()
}

export function generateEventID() : string {
	return "E_" + generateID()
}

export function generateLocationID() : string {
	return "L_" + generateID()
}

export function generateOrganizationID() : string {
	return "O_" + generateID()
}

export function generateUserID() : string {
	return "U_" + generateID()
}