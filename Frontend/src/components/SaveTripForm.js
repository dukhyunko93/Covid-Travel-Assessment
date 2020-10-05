import React from 'react';

class SaveTripForm extends React.Component {

    state = {
        trip_name: "",
        risk_assessment: "",
    }
    
    postTrip = () => {
        let tripObj = {
            user_id: this.props.currentUser?.user.id,
            trip_name: this.state.trip_name,
            start_location: this.props.origin[0]?.address,
            end_location: this.props.destination[0]?.address,
            risk_assessment: this.state.risk_assessment
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${this.props.token}`
            },
            body: JSON.stringify({trip:tripObj})
        }
        
        fetch(`http://localhost:3001/trips`, options)
    }

    getRiskAssessment = () => {
        let risk_assessment_div = document.querySelector(".assessment")
        let risk_assessment = risk_assessment_div.children[0].children[0].innerText
        this.setState({
            risk_assessment: risk_assessment
        }, () => this.postTrip())
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.getRiskAssessment()
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.props.toggleModal}>&times;</span>
                    <p>Save Your Trip!</p>
                    <form onSubmit={this.submitHandler}>
                        <label>
                            Trip Name:
                            <input type="text" value={this.state.trip_name} name="trip_name" onChange={(e) => this.onChangeHandler(e)} placeholder="Name for your trip!" />
                        </label>
                        <p>Starting Point:</p>
                        <h4>{this.props.origin[0]?.address}</h4>
                        <p>End Point:</p>
                        <h4>{this.props.destination[0]?.address}</h4>
                        <input type="submit" value="submit" onClick={this.props.toggleModal} />
                    </form>
                </div>
            </div>
        )
    }
}
    
export default SaveTripForm
