user stories: 
- user can create a team and invite teammates 
- after user accepts invite/joins team they can see the team overiview page
- overview has team info, teammates, upcoming games, stats 
- when a game is coming up/added users recieve notification/email that a game is coming up 
- in notification user is asked if they will be attending

stretch goals:
- users can message the team in-app
- users can find subsititutes in their area if a teammate is unable to attend
- create a league setting where league runners can have the teams in that league involved with overall league stats and standings  

user: has_many memberships, has_many teams through memberships
name
username
password
email
phone_number?
public? (allows user to be found by others)

team: has_many memberships, has_many users through memberships
logo
name
league
description
standings

membership: belongs_to team, belongs_to user
user_id
team_id

games: belongs_to team
team_id
user_id?
opponent
datetime
location
home (boolean)
result
would need a game-stats table for game-to-game player stats?

hockey stats: belongs_to user, belongs to team
user_id
team_id
games_played
goals
assists
penalty_minutes
plus_minus
save_percentage
saves
goals_allowed

basketball stats: belongs_to user, belongs to team
user_id
team_id
games_played
points
assists
blocks
rebounds
steals
three_pointer_hit
three_attempts
three_precentage

baseball stats: belongs_to user, belongs to team
user_id
team_id
games_played
at_bats
hits
batter_strikeouts
batting_average
rbis
home_runs
stolen_bases
pitcher_strikeouts
innings_pitched
hits_allowed
runs_allowed
era

# squad-check
