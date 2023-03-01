const express = require('express')

const Vaccine = require('./schema')
const date = require('../libs/date')

const app = express()

app.get('/vaccine-summary', async (req, res) => {
  try {
    const { c, from, to, range, sort } = req.query
    const ranges = date.ranges(from, to, parseInt(range))
    const pipeline = [{
      $match: {
        ReportingCountry: c/*,
        YearWeekISO: {
          $in: ranges.flatMap(range => [range.start, range.end])
        }*/
      }
    }, {
      $group: {
        _id: '$YearWeekISO',
        NumberDosesReceived: {
          $sum: '$NumberDosesReceived'
        }
      }
    }, {
      $sort: {
        [sort]: sort === 'NumberDosesReceived' ? -1 : 1
      }
    }]

    const result = await Vaccine.aggregate(pipeline).exec()
    console.log(ranges)
    const summary = result.map((r, i) => ({
      weekStart: ranges[i][0],
      weekEnd: ranges[i][1],
      NumberDosesReceived: r.NumberDosesReceived
    }))

    res.json({ summary })
  } catch (err) {
  	console.log(err)
    res.status(500).json({
    	message: 'Server Error'
    })
  }
})

module.exports = app
