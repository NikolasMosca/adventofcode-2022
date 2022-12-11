console.clear()

const monkeyInput = 
`Monkey 0:
  Starting items: 50, 70, 54, 83, 52, 78
  Operation: new = old * 3
  Test: divisible by 11
    If true: throw to monkey 2
    If false: throw to monkey 7

Monkey 1:
  Starting items: 71, 52, 58, 60, 71
  Operation: new = old * old
  Test: divisible by 7
    If true: throw to monkey 0
    If false: throw to monkey 2

Monkey 2:
  Starting items: 66, 56, 56, 94, 60, 86, 73
  Operation: new = old + 1
  Test: divisible by 3
    If true: throw to monkey 7
    If false: throw to monkey 5

Monkey 3:
  Starting items: 83, 99
  Operation: new = old + 8
  Test: divisible by 5
    If true: throw to monkey 6
    If false: throw to monkey 4

Monkey 4:
  Starting items: 98, 98, 79
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 1
    If false: throw to monkey 0

Monkey 5:
  Starting items: 76
  Operation: new = old + 4
  Test: divisible by 13
    If true: throw to monkey 6
    If false: throw to monkey 3

Monkey 6:
  Starting items: 52, 51, 84, 54
  Operation: new = old * 17
  Test: divisible by 19
    If true: throw to monkey 4
    If false: throw to monkey 1

Monkey 7:
  Starting items: 82, 86, 91, 79, 94, 92, 59, 94
  Operation: new = old + 7
  Test: divisible by 2
    If true: throw to monkey 5
    If false: throw to monkey 3`

//Monkey instance
class Monkey {
  constructor({ name, items, sign, number, divisible, monkeyTrue, monkeyFalse }) {
    this.name = name
    this.items = items
    this.sign = sign
    this.number = number
    this.divisible = divisible
    this.monkeyTrue = monkeyTrue
    this.monkeyFalse = monkeyFalse
    this.holdingItems = 0
  }
  
  //Play with all items and return on what monkey throw each item
  play() {
    this.holdingItems += this.items.length
    const throwItems = this.items.map((item, index) => {
      return this.throw(this.operation(item))
    })
    this.items = []
    return throwItems
  }
  
  operation(old) {
    let total = old
    let number = this.number === 'old' ? old : Number(this.number)
    if(this.sign === '*') total *= number
    if(this.sign === '+') total += number
    return Math.floor(total / 3)
  }
  
  throw(old) {
    return old % this.divisible === 0 ? [
      old, this.monkeyTrue
    ] :  [
      old, this.monkeyFalse
    ]
  }
  
  receive(item) {
    this.items.push(item)
  }
  
  remove(index) {
    this.items = this.items.filter((item, i) => i !== index)
  }
}

//Create monkeys from input
const monkeys = (monkeyInput.split(`\n\n`)).map((item) => {
  const rows = item.split(`\n`)
  const [ name, startingItems, operation, test, ifTrue, ifFalse ] = rows
  const [sign, number] = (operation.split('new = old ')[1]).split(' ')
  return new Monkey({
    name: name.split(':')[0],
    items: [ ...((startingItems.split(':')[1]).split(',')).map(item => Number(item)) ],
    sign,
    number,
    divisible: Number(test.split(`divisible by `)[1]),
    monkeyTrue: Number(ifTrue.split('throw to monkey ')[1]),
    monkeyFalse: Number(ifFalse.split('throw to monkey ')[1]),
  })
})

//Play rounds with monkeys 
for(let round = 0; round < 20; round++) {
  console.log('======= ROUND ', round)
  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    console.log(`=== ${monkey.name} play! `)
    const throwItems = monkey.play()
    for(let j = 0; j < throwItems.length; j++) {
      const [item, monkeyIndex] = throwItems[j]
      monkeys[monkeyIndex].receive(item)
      //console.log(`${monkey.name} throws item ${j} with worry level ${item} to ${monkeys[monkeyIndex].name}`)
    }
  }
}

const holdingItems = monkeys.map(item => item.holdingItems)
holdingItems.sort((a, b) => b - a)
console.log('Top active monkeys', holdingItems)

const [first, second] = holdingItems
console.log(`Monkey business: ${first * second}`)
