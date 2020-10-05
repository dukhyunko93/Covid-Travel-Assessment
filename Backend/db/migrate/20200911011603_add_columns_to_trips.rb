class AddColumnsToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :trip_name, :string
    change_column :trips, :risk_assessment, :string
  end
end
