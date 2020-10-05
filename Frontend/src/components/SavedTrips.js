import React from 'react';

class SavedTrips extends React.Component{
    
    state = {
        user_id: this.props.currentUser?.user.id,
        savedTrip: []
    }

    componentDidUpdate(prevProps){
      if(this.props !== prevProps){
        this.setState({
          user_id: this.props.currentUser?.user.id
        },() => this.getSavedTrips())
      }
    }

    getSavedTrips = () => {
        const config = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.props.token}`
          }
        }
      
        fetch(`http://localhost:3001/trips/${this.state.user_id}`, config)
        .then(response => response.json())
        .then(trip => {
          this.setState({
            savedTrip: trip
          })
        })
    }

    renderStartingPoint() {
      return this.state.savedTrip.trip?.map(tripObj => <StartingPoint key={tripObj.id} tripObj={tripObj}/>)
    }

    renderDestination() {
      return this.state.savedTrip.trip?.map(tripObj => <Destination key={tripObj.id} tripObj={tripObj}/>)
    }

    renderRiskAssessment() {
      return this.state.savedTrip.trip?.map(tripObj => <RiskAssessment key={tripObj.id} tripObj={tripObj}/>)
    }

    render(){
      console.log(this.state)
        return (
            <div className="wrapper">
                <div className="left">
                    <div className="left-container">
                        <img src="https://d302e0npexowb4.cloudfront.net/wp-content/uploads/2017/02/Snoopy-Peanuts.png" alt="user" width="200" />
                        <h4>{this.props.currentUser?.user.first_name} {this.props.currentUser?.user.last_name}</h4>
                        <p>{this.props.currentUser?.user.nickname}</p>
                        <p>Birthday: {this.props.currentUser?.user.dob}</p>
                        <p>Address: {this.props.currentUser?.user.current_location}</p>
                    </div>
                </div>
            
                <div className="right">
                    <div className="info">
                        <h3>List of Trips</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>Starting Point</h4>
                                {this.renderStartingPoint()}
                            </div>
                            <div className="data">
                                <h4>Destination</h4>
                                {this.renderDestination()}
                            </div>
                            <div className="data">
                                <h4>Risk Assessment</h4>
                                {this.renderRiskAssessment()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SavedTrips

function StartingPoint(props) {
  return(
    <p>{props.tripObj.start_location}</p>
  )
}

function Destination(props) {
  return(
    <p>{props.tripObj.end_location}</p>
  )
}

function RiskAssessment(props) {
  return(
    <p>{props.tripObj.risk_assessment}</p>
  )
}