class AddForeignKeyToVisit < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :visits, :urls, column: :urls_id
  end
end
