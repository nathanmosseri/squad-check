class AddNameToAttending < ActiveRecord::Migration[7.0]
  def change
    add_column :attendings, :name, :string
  end
end
