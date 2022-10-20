class CreateAttendings < ActiveRecord::Migration[7.0]
  def change
    create_table :attendings do |t|
      t.integer :game_id
      t.integer :user_id
      t.boolean :attending

      t.timestamps
    end
  end
end
