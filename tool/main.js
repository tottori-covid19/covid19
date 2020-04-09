const fs = require('fs')
const csv = require('csv')

const outputPath = '../data/data.json'

const areaName = 'tottori'
const defaultLanguageCode = 'ja-JP'
const defaultTimezone = '+0900'
const date = new Date().toLocaleString(defaultLanguageCode)

async function importInspectionDataset() {
  const inspectionDataset = fs.createReadStream(
    `downloads/${areaName}/inspection.csv`
  )

  const inspectionParser = csv.parse({ columns: true })
  const inspectionsSummary = {
    date,
    data: {
      [areaName]: []
    },
    labels: []
  }
  const patientsSummary = {
    date,
    data: []
  }

  inspectionParser.on('readable', () => {
    let data
    while ((data = inspectionParser.read())) {
      inspectionsSummary.labels.push(`${data.月}/${data.日}`)
      inspectionsSummary.data[areaName].push(Number(data.検査件数))
      patientsSummary.data.push({
        日付: [
          `${data.年}-${`0${data.月}`.slice(-2)}-${`0${data.日}`.slice(-2)}`,
          `00:00:00${defaultTimezone}`
        ].join('T'),
        小計: Number(data.陽性)
      })
    }
  })

  const promise = new Promise(resolve => {
    inspectionParser.on('end', resolve)
  })

  inspectionDataset.pipe(inspectionParser)

  await promise

  return { inspectionsSummary, patientsSummary }
}

async function importQuerentDataset() {
  const inspectionDataset = fs.createReadStream(
    `downloads/${areaName}/querent.csv`
  )

  const querentsParser = csv.parse({ columns: true })
  const querents = {
    date,
    data: []
  }

  querentsParser.on('readable', () => {
    let data
    while ((data = querentsParser.read())) {
      querents.data.push({
        日付: [
          `${data.年}-${`0${data.月}`.slice(-2)}-${`0${data.日}`.slice(-2)}`,
          `00:00:00${defaultTimezone}`
        ].join('T'),
        小計: Number(data.相談件数)
      })
    }
  })

  const promise = new Promise(resolve => {
    querentsParser.on('end', resolve)
  })

  inspectionDataset.pipe(querentsParser)

  await promise

  return { querents }
}

async function main() {
  const templateJson = fs.readFileSync('../data/data.json.template')
  const template = JSON.parse(templateJson)

  template.lastUpdate = date
  template.patients.date = date

  const {
    inspectionsSummary,
    patientsSummary
  } = await importInspectionDataset()

  template.inspections_summary = inspectionsSummary
  template.patients_summary = patientsSummary

  const { querents } = await importQuerentDataset()

  template.querents = querents

  fs.writeFileSync(outputPath, JSON.stringify(template, null, 4))

  console.log('success')
}

main()
