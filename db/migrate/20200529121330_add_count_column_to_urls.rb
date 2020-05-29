class AddCountColumnToUrls < ActiveRecord::Migration[6.0]
  def change
    add_column :urls, :count, :integer, null: false, default: 0
  end
end
