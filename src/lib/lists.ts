export function getRandomItem(list: List): Item {
  // Increment all weights by 1.
  const items = list.items
    .map(item => ({ ...item, weight: item.weight++ }));

  // Calculate cumulative weights.
  const cumulativeWeights: Array<number> = [];
  let cumulativeWeight = 0;
  items.forEach(item => {
    cumulativeWeight += item.weight;
    cumulativeWeights.push(cumulativeWeight);
  });

  // Generate a random index and store that item.
  const randomWeight = Math.random() * cumulativeWeight;
  const randomIndex = cumulativeWeights.findIndex(weight => weight >= randomWeight);
  const chosenItem = items[randomIndex];

  // Reset the weight of the selected item to 1.
  list.items[randomIndex].weight = 1;

  return chosenItem;
}
