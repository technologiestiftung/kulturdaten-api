import { Schema, InferSchemaType } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';


export const userSchema = new Schema({
	_id: { type: String },
	email: { type: String },
	password: { type: String, select: false },
	firstName: { type: String },
	lastName: { type: String },
	created: { type: String },
	updated: { type: String },
	permissionFlags: { type: Number },
}, { id: false }).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

export type User = InferSchemaType<typeof userSchema>;