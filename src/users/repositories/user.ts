import { Schema } from 'mongoose';
import mongooseAsyncNanoid from 'mongoose-async-nanoid';


export interface User {
	id: string,
	email: string,
	password?: string,
	firstName?: string,
	lastName?: string,
	createdAt?: string,
	updatedAt?: string,
	permissionFlags?: number
}


export const userSchema = new Schema<User>({
	email: { type: String },
	password: { type: String, select: false },
	firstName: { type: String },
	lastName: { type: String },
	permissionFlags: { type: Number },
}, {
	timestamps: true,
	toJSON: {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) { delete ret._id }
	}, toObject: {
		virtuals: true,
		versionKey: false,
		transform: function (doc, ret) { delete ret._id }
	}
}).plugin(mongooseAsyncNanoid, {
	length: 12,
	charset: process.env.ID_CHARSET,
});

