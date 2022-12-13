console.clear()

const mazeInput = 
`abccccccccaaaaaaaccaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccaaaaaa
abccccccccaaaaaaaccaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccaaaaaa
abccccccccccaaaaaaccaaaaaaaaaaaaaaaaccccccccccccccccacccccccccccccccccccaaaaa
abcccccaaaacaaaaaaccaaaaaaaaaaaaaaaaacccccccccccccccaaaccccaccccccccccccccaaa
abccccaaaaacaaccccccaaaaaacaaacaacaaaaaaacccccccccccaaaacccaacccccccccccccaaa
abaaccaaaaaaccccaaacaaaacacaaacaaccaaaaaacccccccccccaklaccccccccccccccccccaac
abaaccaaaaaaccaaaaaacccccccaaacccaaaaaaaccccccccccckkkllllccccccccccccccccccc
abaaccaaaaaaccaaaaaacccccccaaaaacaaaaaaacccccccccckkkklllllcccccccaaaccaccccc
abacccccaacccccaaaaacccccccaaaaaccaaaaaaacccccccckkkkpppllllccccccaaaaaaccccc
abacccccccccccaaaaacccccccccaaaacccaaaaaaccccccckkkkpppppplllccccddddaaaccccc
abccccccccccccaaaaaccccccccccaaaccaaaccccccccccckkkppppppppllllldddddddaccccc
abccacccccccccccccccccccccccccccccaaccccccccccckkkopppupppplllmmmmdddddaacccc
abccaaacaaaccccccccccccccccccccaaaaaaaaccccccckkkkopuuuuupppllmmmmmmddddacccc
abccaaaaaaaccccccccccccccccccccaaaaaaaacccccjjkkkooouuuuuuppqqqqqmmmmddddcccc
abccaaaaaacccccccccccccccaaccccccaaaacccccjjjjjjoooouuxuuuppqqqqqqmmmmdddcccc
abcaaaaaaaacccccccccccccaaacccccaaaaaccccjjjjoooooouuuxxuuvvvvvqqqqmmmdddcccc
abaaaaaaaaaacccccccaaaaaaacaacccaacaaacccjjjooooouuuuxxxxvvvvvvvqqqmmmdddcccc
abaaaaaaaaaacccaaacaaaaaaaaaacccacccaaccjjjooootttuuuxxxyyvyyvvvqqqmmmeeecccc
abcccaaacaaacccaaaaaaacaaaaaccccccccccccjjjooottttxxxxxxyyyyyyvvqqqmmmeeccccc
abcccaaacccccccaaaaaacaaaaaccccaaccaacccjjjnnntttxxxxxxxyyyyyvvvqqqnneeeccccc
SbccccaacccccccaaaaaaaaacaaacccaaaaaacccjjjnnntttxxxEzzzzyyyyvvqqqnnneeeccccc
abcccccccccccccaaaaaaaaacaaccccaaaaaccccjjjnnnttttxxxxyyyyyvvvrrrnnneeecccccc
abcccaacccccccaaaaaaaaaccccccccaaaaaacccciiinnnttttxxxyyyyywvvrrrnnneeecccccc
abcccaaaaaaccaaaaaaaacccccccccaaaaaaaaccciiiinnnttttxyyywyyywvrrrnnneeecccccc
abcccaaaaaaccaaaaaaaacccccccccaaaaaaaacccciiinnnntttxwywwyyywwwrrnnneeecccccc
abcaaaaaaaccaaaaaaaaaccccccccccccaacccccccciiinnnttwwwwwwwwwwwwrrnnneeecccccc
abcaaaaaaaccaaaaaacccccccccccccccaaccccccaaiiiinnttwwwwwwwwwwwrrrnnnffecccccc
abcccaaaaaaccaaaaaccccccccccccccccccccaaaaaciiinnssswwwssssrwwrrrnnnfffcccccc
abaacaaccaaccaaaccccccccaacccccccccccccaaaaaiiinnssssssssssrrrrrronnfffcccccc
abaccaaccaacccccccccaaacaacccccccccccccaaaaaiiimmmssssssmoosrrrrooonffaaacccc
abaaaccccaaaaaaccccccaaaaaccccccccccccaaaaaccihmmmmsssmmmoooooooooofffaaacccc
abaaaccccaaaaaacccccccaaaaaacccccccccccccaacchhhmmmmmmmmmoooooooooffffaaccccc
abaacccaaaaaaaccccccaaaaaaaaccccaaccccccccccchhhhmmmmmmmgggggooofffffaaaccccc
abaacccaaaaaaaccccccaaaaaaaccccaaaaccccccccccchhhhmmmmhggggggggfffffaaaaccccc
abccccccaaaaaaacccccaacaaaaacccaaaaccccccccccchhhhhhhhggggggggggfffaacaaccccc
abccaacccaaaaaaccccccccaaaaaccaaaaacccccccccccchhhhhhhggaaaaaaccccccccccccccc
abccaaaccaaccccccccccccccaaaaaaaaaccccccccccccccchhhhaaaccaaaacccccccccccccaa
abaaaaaaaccccccccccccccccaaaaaaaaccccccccccccccccccccaaaccccaaccccccccccccaaa
abaaaaaaaccccccccaaaccccacaaaaaacccccccccccccccccccccaaaccccccccccccccccccaaa
abaaaaaacccccccaaaaacaaaaaaaaaaacccccccccccccccccccccaaccccccccccccccccaaaaaa
abaaaaaacccccccaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaaaa`

const LETTERS = `abcdefghijklmnopqrstuvwxyz`
const START_LETTER = 'S'
const END_LETTER = 'E'

//Find the element 
const findItem = (maze, element) => {
  const elements = []
  for(let i = 0; i < maze.length; i++) {
    const row = maze[i]
    for(let j = 0; j < row.length; j++) {
      const currentElement = row[j]
      if(currentElement === element) {
        elements.push([i, j])
      }
    }
  }
  return elements
}

//Find elements up, down, right, left
const getElementsAround = (maze, [x, y]) => {
  const elements = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''] 
  ]
  if(maze[x - 1] && maze[x - 1][y]) elements[0][1] = maze[x - 1][y]
  if(maze[x + 1] && maze[x + 1][y]) elements[2][1] = maze[x + 1][y]
  if(maze[x] && maze[x][y - 1]) elements[1][0] = maze[x][y - 1]
  if(maze[x] && maze[x][y + 1]) elements[1][2] = maze[x][y + 1]
  return elements
}

//Find elements by level 
const findElementsByLevel = (elementsAround, level, [myX, myY]) => [...findItem(elementsAround, LETTERS[level])]
    .map(([x, y]) => [myX + (x - 1), myY + (y -1)])
    .filter(([x, y]) => !pastPositions.find(([x1, y1]) => x === x1 && y === y1))

//Choose best move 
const getBestMove = (items, [endX, endY]) => items.reduce(({best, score}, [x, y]) => {
    const currentScore = (x - endX) + (y - endY)
    if(currentScore <= score || score === null) {
      best = [x, y]
      score = currentScore
    }
    return {
      best,
      score
    }
  }, {
    best: [],
    score: null
  }).best

const getScorePath = ({cache, x, y, level, index, deep}) => {
  //Avoid infinite loop
  if(deep <= 0) return false

  if(!maze[x] || !maze[x][y]) {
    return false
  }
  if(cache[`${x}-${y}`] === undefined) {
    return false
  }
  if(index > cache[`${x}-${y}`]) {
    return false
  }
  const positionLevel = [...LETTERS].findIndex(item => maze[x][y] === item)
  if(positionLevel > (level + 1)) {
    return false
  }
  
  let score = cache[`${x}-${y}`]
  const top = getScorePath({cache, x, y: y - 1, level: positionLevel, index: score, deep: deep - 1})
  const bottom = getScorePath({cache, x, y: y + 1, level: positionLevel, index: score, deep: deep - 1})
  const left = getScorePath({cache, x: x - 1, y, level: positionLevel, index: score, deep: deep - 1})
  const right = getScorePath({cache, x: x + 1, y, level: positionLevel, index: score, deep: deep - 1})
  if(top?.score && top.score > score) score = top.score
  if(bottom?.score && bottom.score > score) score = bottom.score
  if(left?.score && left.score > score) score = left.score
  if(right?.score && top.score > score) score = right.score
  return {
    position: cache[`${x}-${y}`],
    score
  }
}

const optimizePath = (breadcrumbs) => {
  const optimizedTrack = []
  const cacheBreadcrumbs = breadcrumbs.reduce((data, [x, y], index) => ({...data, [`${x}-${y}`]: index}), {})
  let level = 0
  for(let i = 0; i < breadcrumbs.length; i++) {
    const [x, y] = breadcrumbs[i]
    optimizedTrack.push([x, y])
    level = [...LETTERS].findIndex(item => maze[x][y] === item)

    const DEEP_LEVEL = 5
    const top = getScorePath({
      cache: cacheBreadcrumbs, 
      x, 
      y: y - 1, 
      level, 
      index: i, 
      deep: DEEP_LEVEL
    })
    const bottom = getScorePath({
      cache: cacheBreadcrumbs, 
      x, 
      y: y + 1, 
      level, 
      index: i, 
      deep: DEEP_LEVEL
    })
    const left = getScorePath({
      cache: cacheBreadcrumbs, 
      x: x - 1, 
      y, 
      level, 
      index: i, 
      deep: DEEP_LEVEL
    })
    const right = getScorePath({
      cache: cacheBreadcrumbs, 
      x: x + 1, 
      y, 
      level, 
      index: i, 
      deep: DEEP_LEVEL
    })

    const indexes = []
    let score = 0
    if(top?.position && (score === 0 || score < top.score)) {
      indexes.push(top.position)
      score = top.score
    }
    if(bottom?.position && (score === 0 || score < bottom.score)) {
      indexes.push(bottom.position)
      score = bottom.score
    }
    if(left?.position && (score === 0 || score < left.score)) {
      indexes.push(left.position)
      score = left.score
    }
    if(right?.position && (score === 0 || score < right.score)) {
      indexes.push(right.position)
      score = right.score
    }

    if(indexes.length > 0) {
      indexes.reverse()
      const [bestIndex] = indexes
      i = bestIndex
      optimizedTrack.push(breadcrumbs[i])
      level = [...LETTERS].findIndex(item => maze[x][y] === item)
    }
  }

  return optimizedTrack
}

//Debug
const debugMaze = (maze, [x, y], memory = null) => {
  let print = ``
  for(let i = 0; i < maze.length; i++) {
    for(let j = 0; j < maze[i].length; j++) {
      if(!memory) memory = pastPositions
      const usedPosition = memory.find(([pX, pY]) => pX === i && pY === j)
      if(x === i && y === j) {
        print += '■'
      } else if(usedPosition) {
        print += '.'
      } else {
        print += maze[i][j]
      }
    }
    print += `\n`
  }
  if(!arrived) console.clear()
  console.log(print)
}

//Debug
const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}

const maze = (mazeInput.split(`\n`)).map(item => item.split(''))
const [START] = findItem(maze, START_LETTER)
const [END] = findItem(maze, END_LETTER)

let currentPosition = START
let level = 0
let arrived = false
const breadcrumbs = []
const pastPositions = []
const optimizedTrack = [];

(async () => {
  do {
    //Find elements around
    const elementsAround = getElementsAround(maze, currentPosition)
  
    //Find all possibilities
    const [myX, myY] = currentPosition
  
    //Get all next level moves, convert into real coordinates and filter all past positions already used
    const nextLevelElements = findElementsByLevel(elementsAround, level + 1, currentPosition)
    const nextLevelElement = nextLevelElements.length > 0 ? getBestMove(nextLevelElements, END) : null
  
    //Get all current level moves, convert into real coordinates and filter all past positions already used
    const currentLevelElements = findElementsByLevel(elementsAround, level, currentPosition)
    const currentLevelElement = currentLevelElements.length > 0 ? getBestMove(currentLevelElements, END) : null

    //Get all minus level moves, convert into real coordinates and filter all past positions already used
    let minusLevelElements = []
    let minusLevel = level - 1
    do {
      minusLevelElements = findElementsByLevel(elementsAround, minusLevel, currentPosition)
      minusLevel--
    } while(minusLevelElements.length === 0 && minusLevel >= 0)
    const minusLevelElement = minusLevelElements.length > 0 ? getBestMove(minusLevelElements, END) : null
    
    const [endElement] = [...findItem(elementsAround, END_LETTER)].map(([x, y]) => [myX + (x - 1), myY + (y -1)])
  
    pastPositions.push(currentPosition)
    if(endElement && level === LETTERS.length - 1) {
      breadcrumbs.push(currentPosition)
      arrived = true
      currentPosition = [...endElement]
      console.log('==== ARRIVED!')
    } else if(nextLevelElement) {
      breadcrumbs.push(currentPosition)
      currentPosition = [...nextLevelElement]
    } else if(currentLevelElement) {
      breadcrumbs.push(currentPosition)
      currentPosition = [...currentLevelElement]
    } else if(minusLevelElement) {
      breadcrumbs.push(currentPosition)
      currentPosition = [...minusLevelElement]
    } else {
      currentPosition = [...breadcrumbs[breadcrumbs.length - 1]]
      breadcrumbs.splice(-1)
      console.log("NO POSITIONS FOUND! RETURN TO PREVIOUS STEP")
    }
  
    const [x, y] = currentPosition
    level = [...LETTERS].findIndex(item => maze[x][y] === item)
    console.log(`LEVEL => ${level} | LETTER => ${LETTERS[level]} | STEPS => ${breadcrumbs.length}`)
  
    if(!arrived) debugMaze(maze, currentPosition)
  } while(!arrived)
  
  let optimizedTrack = optimizePath([...breadcrumbs])
  console.log('optimization', breadcrumbs.length, optimizedTrack.length)
  debugMaze(maze, currentPosition, optimizedTrack)
})();
