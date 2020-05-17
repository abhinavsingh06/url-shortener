class MakeColumnsUnique < ActiveRecord::Migration[6.0]
  def change
    add_index :urls, :short, unique: true
  end
end
