class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :logo
      t.string :league
      t.string :description
      t.integer :wins
      t.integer :loses
      t.integer :ties 
      t.integer :overtime_loses

      t.timestamps
    end
  end
end
