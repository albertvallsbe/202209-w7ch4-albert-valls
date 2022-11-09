import { mongoDebug } from "../loadEnvironment.js";

import mongoose from "mongoose";

const connectDb = async (url: string) => {
  await mongoose.connect(url);
  mongoose.set("debug", mongoDebug === "true");
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    },
  });
};

export default connectDb;
