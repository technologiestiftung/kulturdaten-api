import { Schema, InferSchemaType } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';


export const organizerSchema = new Schema({
	_id: {type: String},
	name: {type: String},
	description: {type: String},
	created: {type: String},
	updated: {type: String},
}, { id: false }).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

export type Organizer = InferSchemaType<typeof organizerSchema>;

