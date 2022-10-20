# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_20_200353) do
  create_table "attendings", force: :cascade do |t|
    t.integer "game_id"
    t.integer "user_id"
    t.boolean "attending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "baseball_stats", force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.integer "games_played"
    t.integer "at_bats"
    t.integer "hits"
    t.float "batting_average"
    t.integer "batter_strikeouts"
    t.integer "batter_walks"
    t.integer "runs_batted_in"
    t.integer "home_runs"
    t.integer "stolen_bases"
    t.integer "pitcher_strikeouts"
    t.float "innings_pitched"
    t.integer "hits_allowed"
    t.integer "runs_allowed"
    t.float "earned_run_average"
    t.integer "pitcher_walks"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "basketball_stats", force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.integer "games_played"
    t.integer "points"
    t.integer "assists"
    t.integer "blocks"
    t.integer "rebounds"
    t.integer "steals"
    t.integer "three_pointers_hit"
    t.integer "three_pointers_attempted"
    t.float "three_pointer_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "team_id"
    t.string "opponent"
    t.datetime "datetime"
    t.string "location"
    t.boolean "home"
    t.string "result"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "points_against"
    t.integer "points_for"
  end

  create_table "hockey_stats", force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.integer "games_played"
    t.integer "goals"
    t.integer "assists"
    t.integer "penalty_minutes"
    t.integer "plus_minus"
    t.integer "saves"
    t.integer "goals_allowed"
    t.float "save_precentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "logo"
    t.string "league"
    t.string "description"
    t.integer "wins"
    t.integer "loses"
    t.integer "ties"
    t.integer "overtime_loses"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "season"
    t.string "sport"
    t.string "uid"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
