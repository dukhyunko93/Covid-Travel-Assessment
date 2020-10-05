class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  
    def profile
        render json: { user: current_user }, status: :accepted
    end
    
    def create
        @user = User.create(user_params)
        if @user.valid?
          @token = encode_token(user_id: @user.id)
          render json: { user: @user, jwt: @token , created: 'successful'}, status: :created
        else
          render json: { error: 'failed to create user' }, status: :not_acceptable
        end
      end


     
      private
      def user_params
        params.require(:user).permit(:user_name, :password, :first_name, :last_name, :dob, :nickname, :current_location)
      end

end