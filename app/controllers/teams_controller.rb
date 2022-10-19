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
        token = request.headers["Authorization"].split(' ')[1]
        user_id = JWT.decode(token, 'secret', true, algorithm: 'HS256')
        user = User.find(user_id[0]["user_id"])
        tp = team_params
        tp[:uid] = SecureRandom.uuid 
        team = Team.create!(tp)
        membership = Membership.create!(user_id: user.id, team_id: team.id)
        if team.sport == 'Hockey'
            HockeyStat.create!(user_id: user.id, team_id: team.id, games_played: 0, goals: 0, assists: 0, penalty_minutes: 0, plus_minus: 0, saves: 0, goals_allowed: 0, save_precentage: 0)
        elsif team.sport == 'Baseball'
            BaseballStat.create!(user_id: user.id, team_id: team.id, games_played: 0, at_bats: 0, hits: 0, batting_average: 0, batter_strikeouts: 0, batter_walks: 0, runs_batted_in: 0, home_runs: 0, stolen_bases: 0, pitcher_strikeouts: 0, innings_pitched: 0, hits_allowed: 0, runs_allowed: 0, earned_run_average: 0, pitcher_walks: 0)
        elsif team.sport == 'Basketball'
            BasketballStat.create!(user_id: user.id, team_id: team.id, games_played: 0, points: 0, assists: 0, blocks: 0, rebounds: 0, steals: 0, three_pointers_hit: 0, three_pointers_attempted: 0, three_pointer_percentage: 0)
        end
        render json: team, status: :created 
    end

    private 

    def render_not_found(exception)
        render json: {error: exception}, status: :not_found
    end

    def render_unprocessable(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def find_team
        Team.find(params[:id])
    end

    def team_params
        params.permit(:name, :logo, :league, :season, :sport, :description, :wins, :loses, :ties, :overtime_loses, :uid)
    end

end
