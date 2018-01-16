import React from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime  from 'react-datetime'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

function BookingForm({
  onMakeBooking,
  user,
  roomData
}) {
  
  const valid = function( current ){
    return current.day() !== 0
  }

  let dateArray = []

  const handleDate = (event) =>{
    const date = moment(event).format('Y M D')
    dateArray = date.split(' ').map((item) => parseInt(item))
    return dateArray
 }

  const formatTime = (time) => {
    let formatedTimeArray = []
    formatedTimeArray = time.split(':').map((item) => parseInt(item))
    return formatedTimeArray
  }

  return (
    
    <form
    onSubmit={ (event) => {
      event.preventDefault()
      // Data from input
      const formData = event.target.elements
      const roomId = roomData._id
      // startDate data
      const startTime = formatTime(formData.startTime.value)
      const startDate = [...dateArray, ...startTime]
      // endDate data
      const endTime = formatTime(formData.endTime.value)
      const endDate = [...dateArray, ...endTime]

      const businessUnit = formData.business.value
      const purpose = formData.purpose.value
      const description = formData.description.value
      console.log({startDate, endDate, businessUnit, purpose, roomId, description})
      {/* onMakeBooking({startDate, endDate, businessUnit, purpose, roomId}) */}
    }}
    >
    <h2>{roomData.name}</h2>
    <h2>ID: {roomData._id}</h2>
    <div className="date-container">
      <div className="left-container">
        <Datetime 
          dateFormat="YYYY-MM-DD" 
          timeFormat={false} 
          input={false}
          utc={true} 
          isValidDate={valid}
          onChange={ (event) => handleDate(event._d)}        
        />
      </div>

      <div className="middle-container">
        <BookingFormTable />
      </div>

      <div className="right-container">
        
          <label>
            {'Start Time: '}
            <input type="time" name="startTime" min="00:00" max="23:00" />
          </label>
        
          <label>
            {'End Time: '}
            <input type="time" name="endTime" min="00:00" max="23:00" />
          </label>

        <label>
          {'Business Unit:'}
          <select name="business"> 
            <option value="Business Unit 1" selected>Business Unit 1</option> 
            <option value="Business Unit 2">Business Unit 2</option> 
            <option value="Business Unit 3">Business Unit 3</option> 
            <option value="Business Unit 4">Business Unit 4</option> 
            <option value="Business Unit 5">Business Unit 5</option> 
          </select>
        </label>

        <label>
          {'Purpose: '}
          <input type="text" name="purpose" />
        </label>

        <label>
          {'Description'}
          <input type="textarea" name="description" />
        </label>
      </div>
      </div>
    <button>Submit</button>

  </form>
  )
}

export default BookingForm