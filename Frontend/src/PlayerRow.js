// PlayerRow.js
class PlayerRow {
  constructor(id, name, age, average, predicted, price, pricedAt, position, drafted, ignored) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.average = average;
    this.predicted = predicted;
    this.price = price;
    this.pricedAt = pricedAt;
    this.position = position
    this.drafted = drafted;
    this.ignored = ignored;
  }
}

export default PlayerRow;
