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

    private 

    def render_not_found
        render json: {error: 'Game not found'}, status: :not_found
    end

    def find_game
        Game.find(params[:id])
    end

end
