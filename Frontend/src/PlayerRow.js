// PlayerRow.js
class PlayerRow {
  constructor(id, name, age, average, predicted, price, position, drafted, ignored) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.average = average;
    this.predicted = predicted;
    this.price = price;
    this.pricedAt = (price/8773).toFixed(2);
    this.position = position
    this.available = drafted === 0 ? true : false;
    this.drafted = drafted === 1 ? true : false;
    this.taken = drafted >= 2 ? true : false;
    this.ignored = ignored;
    this.rating = 0;
    this.value = 0;
  }
}

export default PlayerRow;
