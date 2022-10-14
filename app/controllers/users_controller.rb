class UsersController < ApplicationController
    
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

    def index 
        users = User.all 
        render json: users
    end

    def show 
        user = find_user
        render json: user, serializer: UsershowwithteamsSerializer
    end

    private 

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
