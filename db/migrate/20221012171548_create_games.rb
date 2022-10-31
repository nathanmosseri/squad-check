class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :team_id
      t.text :opponent
      t.datetime :datetime
      t.text :location
      t.boolean :home
      t.text :result

      t.timestamps
    end
  end
end
