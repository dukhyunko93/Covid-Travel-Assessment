class CreateNytuscounties < ActiveRecord::Migration[6.0]
  def change
    create_table :nytuscounties do |t|
      t.string :date
      t.string :county
      t.string :state
      t.integer :fips
      t.integer :cases
      t.integer :deaths
    end
  end
end
