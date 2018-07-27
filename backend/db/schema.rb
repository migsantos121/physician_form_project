# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180726153138) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customized_formulations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.datetime "birthday"
    t.text "ingredients"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "formulation_ingredients", force: :cascade do |t|
    t.integer "formulation_id"
    t.integer "ingredient_id"
    t.decimal "percentage"
  end

  create_table "formulations", force: :cascade do |t|
    t.string "name"
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.decimal "minimum_percentage"
    t.decimal "maximum_percentage"
    t.text "description"
    t.text "classes", default: [], array: true
  end

end
