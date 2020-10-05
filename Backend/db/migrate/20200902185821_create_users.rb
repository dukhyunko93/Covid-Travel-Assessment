class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :dob
      t.string :user_name
      t.string :password
      t.string :current_location

      t.timestamps
    end
  end
end
