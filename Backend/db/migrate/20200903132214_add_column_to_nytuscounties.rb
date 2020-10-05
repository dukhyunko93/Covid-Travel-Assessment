class AddColumnToNytuscounties < ActiveRecord::Migration[6.0]
  def change
    add_column :nytuscounties, :confirmed_cases, :integer
    add_column :nytuscounties, :confirmed_deaths, :integer
    add_column :nytuscounties,  :probable_cases, :integer
    add_column :nytuscounties,  :probable_deaths, :integer
  end
end
