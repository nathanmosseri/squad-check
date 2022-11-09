class Api::GamesController < ApplicationController

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
        team.users.map do |user|
            if team.sport == 'Hockey'
                GameHockeyStat.create!(user_id: user.id, game_id: game.id, name: user.name, games_played: 0, goals: 0, assists: 0, penalty_minutes: 0, plus_minus: 0, saves: 0, goals_allowed: 0, save_precentage: 0)
            elsif team.sport == 'Baseball'
                GameBaseballStat.create!(user_id: user.id, game_id: game.id, name: user.name, games_played: 0, at_bats: 0, hits: 0, batting_average: 0, batter_strikeouts: 0, batter_walks: 0, runs_batted_in: 0, home_runs: 0, stolen_bases: 0, pitcher_strikeouts: 0, innings_pitched: 0, hits_allowed: 0, runs_allowed: 0, earned_run_average: 0, pitcher_walks: 0)
            elsif team.sport == 'Basketball'
                GameBasketballStat.create!(user_id: user.id, game_id: game.id, name: user.name, games_played: 0, points: 0, assists: 0, blocks: 0, rebounds: 0, steals: 0, three_pointers_hit: 0, three_pointers_attempted: 0, three_pointer_percentage: 0)
            end
        end
        render json: game, status: :created
    end

    def update
        game = find_game
        game.update!(game_params)
        render json: game
    end

    def destroy 
        game = find_game
        game.destroy
        head :no_content
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
