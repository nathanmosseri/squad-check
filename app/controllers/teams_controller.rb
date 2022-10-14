class TeamsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

    def index 
        teams = Team.all 
        render json: teams
    end

    def show
        team = find_team
        render json: team
    end

    def create 
        team = Team.create!(team_params)
        render json: team, status: :created 
    end

    private 

    def render_not_found
        render json: {error: 'Team not found'}, status: :not_found
    end

    def render_unprocessable(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def find_team
        Team.find(params[:id])
    end

    def team_params
        params.permit(:name, :logo, :league, :season, :description, :wins, :loses, :ties, :overtime_loses)
    end

end
