const blockingProcess = (queryQuant) => {
  const numbersArray = []
  const [MIN, MAX] = [1, 1000]
  for (let i = 0; i < queryQuant; i++) {
    numbersArray.push(Math.floor(Math.random() * (MAX - MIN + 1) + MIN))
  }
  const numbersTimes = numbersArray.reduce((acc, curr) => {
    acc[curr] ??= { [curr]: 0 }
    acc[curr][curr]++

    return acc
  }, {})
  return numbersTimes
}

process.on('message', (data) => {
  const count = blockingProcess(+data)
  process.send(count)
})

module.exports = blockingProcess
