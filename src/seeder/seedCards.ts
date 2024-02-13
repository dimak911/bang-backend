import { connect, disconnect } from "mongoose";
import Card from "../models/card.model";
import { MONGODB_URI } from "../config";

//create your array. i inserted only 1 object here
const cards = [
  new Card({
    image:
      "https://static.seattletimes.com/wp-content/uploads/2018/01/a8e801dc-f665-11e7-bf8f-ddd02ba4a187-780x1181.jpg",
    title: "Origin",
    author: "Dan Brown",
    description:
      "2017 mystery thriller novel. Dan Brown is back with another thriller so moronic you can feel your IQ points flaking away like dandruff",
    price: 12,
  }),
];

connect(MONGODB_URI)
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

cards.map(async (card, index) => {
  await card.save();

  if (index === cards.length - 1) {
    console.log("DONE!");
    await disconnect();
  }
});
