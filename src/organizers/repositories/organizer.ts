import { Schema } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';
import { log } from 'winston';


export interface Organizer {
	id: string,
	name: string,
	description?: string,
	createdAt?: string,
	updatedAt?: string,
}

export const organizerSchema = new Schema<Organizer>({
	name: { type: String },
	description: { type: String }
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) { 
			delete ret._id;	
			return ret;
		}
	}, toObject: {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) { 
			delete ret._id;
			return ret;
		}
	}
}).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

