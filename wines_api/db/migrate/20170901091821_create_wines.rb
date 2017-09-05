class CreateWines < ActiveRecord::Migration
  def change
    create_table :wines do |t|
      t.string :name
      t.string :colour
      t.string :country
      t.string :year
      t.string :image

      t.timestamps null: false
    end
  end
end
