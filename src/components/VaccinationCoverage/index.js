// Write your code here

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {last7DaysVaccination} = props

  console.log(last7DaysVaccination)

  return (
    <ResponsiveContainer width="80%" height={500}>
      <BarChart data={last7DaysVaccination} margin={{top: 5}}>
        <XAxis
          dataKey={last7DaysVaccination.vaccineDate}
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar
          dataKey={last7DaysVaccination.dose1}
          name="Dose 1"
          fill="#2d87bb"
          barSize="15%"
        />
        <Bar
          dataKey={last7DaysVaccination.dose2}
          name="Dose 2"
          fill=" #f54394"
          barSize="15%"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
