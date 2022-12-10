console.clear()

const cyclesInput = 
`addx 1
noop
addx 2
addx 11
addx -4
noop
noop
noop
noop
addx 3
addx -3
addx 10
addx 1
noop
addx 12
addx -8
addx 5
noop
noop
addx 1
addx 4
addx -12
noop
addx -25
addx 14
addx -7
noop
addx 11
noop
addx -6
addx 3
noop
addx 2
addx 22
addx -12
addx -17
addx 15
addx 2
addx 10
addx -9
noop
noop
noop
addx 5
addx 2
addx -33
noop
noop
noop
noop
addx 12
addx -9
addx 7
noop
noop
addx 3
addx -2
addx 2
addx 26
addx -31
addx 14
addx 3
noop
addx 13
addx -1
noop
addx -5
addx -13
addx 14
noop
addx -20
addx -15
noop
addx 7
noop
addx 31
noop
addx -26
noop
noop
noop
addx 5
addx 20
addx -11
addx -3
addx 9
addx -5
addx 2
noop
addx 4
noop
addx 4
noop
noop
addx -7
addx -30
noop
addx 7
noop
noop
addx -2
addx -4
addx 11
addx 14
addx -9
addx -2
noop
addx 7
noop
addx -11
addx -5
addx 19
addx 5
addx 2
addx 5
noop
noop
addx -2
addx -27
addx -6
addx 1
noop
noop
addx 4
addx 1
addx 4
addx 5
noop
noop
noop
addx 1
noop
addx 4
addx 1
noop
noop
addx 5
noop
noop
addx 4
addx 1
noop
addx 4
addx 1
noop
noop
noop
noop`

//Parse cycles
const cycles = (cyclesInput.split(`\n`)).map(
  item => item.startsWith('noop') ? [item] : (
    item.split(` `)
  ).map(item => 
    !isNaN(Number(item)) ? Number(item) : item
  )
)

//Prepare operations
const operations = cycles.reduce((operations, [operation, amount], index) => {
  operations.push(0)
  if(operation === 'addx') {
    operations.push(amount)
  }
  return operations
}, [])

//Calculate signal strength
const { crt } = operations.reduce(({ x, crt, sprite }, amount, index) => {
  const [spriteMin, spriteMax] = sprite
  const cycle = index + 1
  const position = Math.floor(index % 40)
  const row = Math.floor(index / 40)
  crt[row] += position >= spriteMin && position <= spriteMax ? `#` : `.`
  x += amount
  sprite = [x - 1, x + 1]
  return { x, crt, sprite }
}, {
  x: 1,
  crt: [``, ``, ``, ``, ``, ``],
  sprite: [0, 2]
})

console.log(crt.join(`\n`))
