class TeamsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index 
        teams = Team.all 
        render json: teams
    end

    def show
        team = find_team
        render json: team
    end

    private 

    def render_not_found
        render json: {error: 'Team not found'}, status: :not_found
    end

    def find_team
        Team.find(params[:id])
    end

end
