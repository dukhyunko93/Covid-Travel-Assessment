class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.string :start_location
      t.string :end_location
      t.string :start_date
      t.string :end_date
      t.integer :risk_assessment

      t.timestamps
    end
  end
end
