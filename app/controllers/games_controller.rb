class GamesController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index 
        games = Game.all 
        render json: games
    end

    def show
        game = find_game
        render json: game
    end

    def create
        game = Game.create!(game_params)
        team = Team.find(game.team_id)
        attending = team.users.map do |user|
            Attending.create!(game_id: game.id, user_id: user.id, attending: nil, name: user.name)
        end
        render json: game, status: :created
    end

    private 

    def render_not_found
        render json: {error: 'Game not found'}, status: :not_found
    end

    def find_game
        Game.find(params[:id])
    end

    def game_params
        params.permit(:team_id, :opponent, :datetime, :location, :home, :points_for, :points_against)
    end

end
