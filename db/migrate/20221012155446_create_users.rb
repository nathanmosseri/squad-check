class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.text :name
      t.text :username
      t.text :password_digest
      t.text :email
      t.text :phone_number

      t.timestamps
    end
  end
end
