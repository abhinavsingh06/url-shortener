class MakeOriginalUrlUnique < ActiveRecord::Migration[6.0]
  def change
    add_index :urls, :original, unique: true
  end
end
