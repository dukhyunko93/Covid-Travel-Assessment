class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :country
      t.string :state
      t.string :city
      t.string :county
      t.integer :fips

      t.timestamps
    end
  end
end
