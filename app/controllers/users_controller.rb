class UsersController < ApplicationController

    before_action :authorized, only: [:show]
    
    #rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    #rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

    def index 
        users = User.all 
        render json: users
    end

    # def show 
    #     user = find_user
    #     render json: user, serializer: UsershowwithteamsSerializer
    # end

    def show 
        render json: {user: @current_user}, serializer: UsershowwithteamsSerializer
    end

    def create 
        @user = User.create!(user_params)
        token = JWT.encode({user_id: @user.id}, 'secret')
        render json: {user: @user, token: token}
    end

    def logout
        @current_user = nil
        head :no_content
    end

    def login 
        @user = User.find_by(username: params[:username])
        if (@user && @user.authenticate(params[:password]))
            token = JWT.encode({user_id: @user.id}, 'secret')
            render json: {user: @user, token: token}
        end
    end

    private 

    def user_params
        params.permit(:username, :password, :name, :email, :phone_number)
    end

    def render_not_found
        render json: {error: 'User not found'}, status: :not_found
    end
    
    def render_unprocessable(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def find_user
        User.find(params[:id])
    end

end
