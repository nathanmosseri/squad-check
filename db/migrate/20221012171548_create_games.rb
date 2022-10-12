class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :team_id
      t.string :opponent
      t.datetime :datetime
      t.string :location
      t.boolean :home
      t.string :result

      t.timestamps
    end
  end
end
