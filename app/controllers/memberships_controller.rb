class MembershipsController < ApplicationController

    def create 
        member = Membership.create!()
        render json: member
    end

    private 

    def member_params
        params.permit(:group_id, :user_id)
    end

end
