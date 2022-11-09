import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Item = model("Item", itemSchema, "items");

export default Item;
