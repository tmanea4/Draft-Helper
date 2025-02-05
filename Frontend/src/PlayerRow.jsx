// PlayerRow.js
class PlayerRow {
  constructor(id, name, age, average, predicted, price, position, drafted) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.average = average;
    this.predicted = predicted;
    this.price = price;
    this.pricedAt = (price/10260).toFixed(2);
    this.position = position;
    this.drafted = drafted;
    this.rating = 0;
    this.value = 0;
    this.ignored = false;
  }
}

export default PlayerRow;
