class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users
    end

    def show 
        user = find_user
        render json: user, serializer: UsershowwithteamsSerializer
    end

    private 

    def find_user
        User.find(params[:id])
    end

end
