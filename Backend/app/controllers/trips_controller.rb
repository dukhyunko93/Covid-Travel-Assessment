class TripsController < ApplicationController
    before_action :authorized

    def create
        @user = Trip.create(trip_params)
    end

    def show
        user_id = params[:id]
        @trip = Trip.where(user_id: user_id)
        render json: { trip: @trip }, status: :accepted
    end

    private
    def trip_params
    params.require(:trip).permit(:user_id, :start_location, :end_location, :risk_assessment)
    end
end
