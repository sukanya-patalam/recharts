// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

class CowinDashboard extends Component {
  state = {dataList: [], last7DaysVaccination: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <p>Something went wrong</p>
    </div>
  )

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      const updatedLast7DaysVaccination = updatedData.last7DaysVaccination.map(
        eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        }),
      )

      this.setState({
        dataList: updatedData,
        last7DaysVaccination: updatedLast7DaysVaccination,
        isLoading: false,
      })
    } else {
      this.renderFailureView()
    }
  }

  render() {
    const {last7DaysVaccination} = this.state

    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt=" website logo"
            className="website-logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWin Vaccination in India</h1>
        <div className="bar-chart-container">
          <h1 className="bar-graph-heading">Vaccination Coverage</h1>
          <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        </div>
      </div>
    )
  }
}

export default CowinDashboard
