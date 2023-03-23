import { Schema } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';


export interface Organizer {
	id: string,
	name: string,
	description?: string,
	created?: string,
	updated?: string,
}

export const organizerSchema = new Schema<Organizer>({
	name: {type: String},
	description: {type: String},
	created: {type: String},
	updated: {type: String},
}).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

organizerSchema.set('toJSON', {
	virtuals: true,
	versionKey:false,
	transform: function (doc, ret) {   delete ret._id  }
  });

  organizerSchema.set('toObject', {
	virtuals: true,
	versionKey:false,
	transform: function (doc, ret) {   delete ret._id  }
  });
