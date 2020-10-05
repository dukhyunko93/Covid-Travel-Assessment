# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_11_011603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "country"
    t.string "state"
    t.string "city"
    t.string "county"
    t.integer "fips"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "nytuscounties", force: :cascade do |t|
    t.string "date"
    t.string "county"
    t.string "state"
    t.integer "fips"
    t.integer "cases"
    t.integer "deaths"
    t.integer "confirmed_cases"
    t.integer "confirmed_deaths"
    t.integer "probable_cases"
    t.integer "probable_deaths"
  end

  create_table "trips", force: :cascade do |t|
    t.integer "user_id"
    t.string "start_location"
    t.string "end_location"
    t.string "start_date"
    t.string "end_date"
    t.string "risk_assessment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "trip_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "dob"
    t.string "user_name"
    t.string "password_digest"
    t.string "current_location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "nickname"
  end

end
