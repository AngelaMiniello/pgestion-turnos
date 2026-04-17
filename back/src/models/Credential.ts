import mongoose, { Schema } from "mongoose";

const credentialSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Credential", credentialSchema);
