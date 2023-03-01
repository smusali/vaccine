const add = (dateJSON1, dateJSON2) => {
  return normalize({
    week: dateJSON1.week + dateJSON2.week,
    year: dateJSON1.year + dateJSON2.year
  })
}

const compare = (from, to) => {
  const fromJSON = parse(from)
  const toJSON = parse(to)
  return compareJSON(fromJSON, toJSON)
}

const compareJSON = (fromJSON, toJSON) => {
  return fromJSON.year < toJSON.year || (fromJSON.year === toJSON.year && fromJSON.week < toJSON.week)
}

const compose = (dateJSON) => {
  dateJSON = normalize(dateJSON)
  return `${String(dateJSON.year)}-W${dateJSON.week < 10 ? '0' : ''}${dateJSON.week}`
}

const difference = (from, to) => {
  const fromJSON = parse(from)
  const toJSON = parse(to)
  return 52 * (toJSON.year - fromJSON.year) + (toJSON.week - fromJSON.week)
}

const normalize = (dateJSON) => {
  dateJSON.year += Math.floor(dateJSON.week / 52)
  dateJSON.week %= 52
  if (dateJSON.week < 0) dateJSON.week += 52
  return dateJSON
}

const parse = (date) => {
  const year = Number(date.slice(0, 4))
  const week = Number(date.slice(6))

  return normalize({ week, year })
}

const ranges = (from, to, range) => {
  const fromJSON = parse(from)
  const toJSON = add(parse(to), { year: 0, week: -1 })
  const numRanges = Math.floor(difference(from, to) / range)
  const result = []

  let start = fromJSON
  for (let i = 0; i < numRanges; i++) {
    const end = add(start, { year: 0, week: range })
    result.push([compose(start), compose(end)])
    start = end
  }

  if (compareJSON(start, toJSON)) result.push([compose(start), compose(toJSON)])
  return result
}

module.exports = {
  add,
  compare,
  compose,
  difference,
  normalize,
  parse,
  ranges
}
