class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false, index: {unique: true}
      t.string :color, default: '#ffffff'

      t.timestamps
    end
    add_reference :urls, :category, index: {unique: true}
  end
end
