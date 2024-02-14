import mongoose from "mongoose";

import { seeders } from "./seeders";

export const runSeeders = (mongoConnection: mongoose.mongo.Db) => {
  seeders.map(async ({ collectionName, seeder }) => {
    const documents = await mongoConnection
      .collection(collectionName)
      .countDocuments();

    if (documents === 0) {
      await seeder();
    }
  });
};
