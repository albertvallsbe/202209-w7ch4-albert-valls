import type { InferSchemaType } from "mongoose";
import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  picture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
});

export type ItemStructure = InferSchemaType<typeof ItemSchema>;

const Item = model("Item", ItemSchema, "items");

export default Item;
