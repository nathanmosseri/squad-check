class Api::AttendingsController < ApplicationController

    def update
        token = request.headers["Authorization"].split(' ')[1]
        user_id = JWT.decode(token, 'secret', true, algorithm: 'HS256')
        user = User.find(user_id[0]["user_id"])
        attendance = Attending.find_by!(user_id: user.id, game_id: params[:game_id])
        attendance.update!(attending: params[:attending])
        render json: attendance
    end

end
