const mongoose = require('mongoose');
const { Schema } = mongoose;

const vaccineSchema = new Schema({
  YearWeekISO: { type: String, required: true },
  FirstDose: { type: Number, required: true },
  FirstDoseRefused: { type: String, default: '' },
  SecondDose: { type: Number, required: true },
  DoseAdditional1: { type: Number, default: 0 },
  DoseAdditional2: { type: Number, default: 0 },
  DoseAdditional3: { type: Number, default: 0 },
  UnknownDose: { type: Number, default: 0 },
  NumberDosesReceived: { type: String, default: '' },
  NumberDosesExported: { type: String, default: '' },
  Region: { type: String, required: true },
  Population: { type: String, required: true },
  ReportingCountry: { type: String, required: true },
  TargetGroup: { type: String, required: true },
  Vaccine: { type: String, required: true },
  Denominator: { type: Number, required: false }
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;
