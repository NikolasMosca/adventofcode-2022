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
    this.number = number === 'old' ? 'old' : BigInt(number)
    this.divisible = divisible
    this.monkeyTrue = monkeyTrue
    this.monkeyFalse = monkeyFalse
    this.holdingItems = 0
  }
  
  //Play with all items and return on what monkey throw each item
  async play() {
    this.holdingItems += this.items.length
    const throwItems = await Promise.all(this.items.map(async (item) => {
      return this.throw(this.operation(item))
    }))
    this.items = []
    return throwItems
  }
  
  operation(old) {
    if(this.sign === '*') {
        old *= this.number === 'old' ? old : this.number
    } else if(this.sign === '+') {
        old += this.number === 'old' ? old : this.number
    }
    return old
  }
  
  throw(old) {
    return old % this.divisible === 0n ? [
      old % this.superModulo, this.monkeyTrue
    ] :  [
      old % this.superModulo, this.monkeyFalse
    ]
  }
}

//Create monkeys from input
const monkeys = (monkeyInput.split(`\n\n`)).map((item) => {
  const rows = item.split(`\n`)
  const [ name, startingItems, operation, test, ifTrue, ifFalse ] = rows
  const [sign, number] = (operation.split('new = old ')[1]).split(' ')
  return new Monkey({
    name: name.split(':')[0],
    items: [ ...((startingItems.split(':')[1]).split(',')).map(item => BigInt(item)) ],
    sign,
    number,
    divisible: BigInt(test.split(`divisible by `)[1]),
    monkeyTrue: Number(ifTrue.split('throw to monkey ')[1]),
    monkeyFalse: Number(ifFalse.split('throw to monkey ')[1]),
  })
})

let superModulo = monkeys[0].divisible
for(let i = 1; i < monkeys.length; i++) {
    superModulo *= monkeys[i].divisible
}
for(let i = 0; i < monkeys.length; i++) {
    monkeys[i].superModulo = superModulo
}

//Play rounds with monkeys 
setTimeout(async () => {
    let throwItems, i, j, item, monkeyIndex
    for(let round = 0; round < 10000; round++) {
        console.log('======= ROUND ', round)
        for(i = 0; i < monkeys.length; i++) {
            //console.log(`=== ${monkeys[i].name} play! `)
            throwItems = await monkeys[i].play()
            for(j = 0; j < throwItems.length; j++) {
                item = throwItems[j][0]
                monkeyIndex = throwItems[j][1]
                monkeys[monkeyIndex].items.push(item)
                //console.log(`${monkeys[i].name} throws item ${j} with worry level ${item} to ${monkeys[monkeyIndex].name}`)
            }
        }
    }

    const holdingItems = monkeys.map(item => item.holdingItems)
    console.log(holdingItems)
    holdingItems.sort((a, b) => b - a)
    console.log('Top active monkeys', holdingItems)

    const [first, second] = holdingItems
    console.log(`Monkey business: ${first * second}`)
}, 0)
