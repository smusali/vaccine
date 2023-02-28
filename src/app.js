const express = require('express');

const Vaccine = require('./schema');

const app = express();

app.get('/vaccine-summary', async (req, res) => {
  try {
    const { c, dateFrom, dateTo, rangeSize, sort } = req.query;

    const match = {
      ReportingCountry: c,
      YearWeekISO: { $gte: dateFrom, $lt: dateTo }
    };

    const group = {
      _id: { $substr: ['$YearWeekISO', 0, 4] },
      weeks: {
        $push: {
          week: '$YearWeekISO',
          doses: '$NumberDosesReceived'
        }
      },
      totalDoses: { $sum: '$NumberDosesReceived' },
      totalPopulation: { $sum: '$Denominator' }
    };

    const project = {
      year: '$_id',
      weeks: 1,
      totalDoses: 1,
      totalPopulation: 1,
      coverage: { $multiply: [{ $divide: ['$totalDoses', '$totalPopulation'] }, 100] }
    };

    const sortQuery = {};
    if (sort === 'NumberDosesReceived') {
      sortQuery.totalDoses = -1;
    } else {
      sortQuery.year = 1;
    }

    const pipeline = [
      { $match: match },
      { $group: group },
      { $project: project },
      { $sort: sortQuery }
    ];

    const summary = await Vaccine.aggregate(pipeline);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
