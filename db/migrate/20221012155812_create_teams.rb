class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.text :name
      t.text :logo
      t.text :league
      t.text :description
      t.integer :wins
      t.integer :loses
      t.integer :ties 
      t.integer :overtime_loses

      t.timestamps
    end
  end
end
