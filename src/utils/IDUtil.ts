import { customAlphabet } from "nanoid";


export function generateID(): string {
	const charset = process.env.ID_CHARSET || "123456789ABCDEFGHJKLMNPQRSTWXYZ";
	const length = parseInt(process.env.ID_LENGTH || '12');
	const nanoid = customAlphabet(charset, length)
	return nanoid();
} 