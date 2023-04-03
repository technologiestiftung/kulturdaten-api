import { Schema } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';
import { log } from 'winston';
import { Organizer } from '../models/organizer.generated';

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
			ret.createdAt = "asdf";
			ret.updatedAt = "asdf";
			return ret;
		}
	}, toObject: {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) { 
			delete ret._id;
		ret.createdAt = "asdf";
			ret.updatedAt = "asdf";
			return ret;
		}
	}
}).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

