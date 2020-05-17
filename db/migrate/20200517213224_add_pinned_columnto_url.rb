class AddPinnedColumntoUrl < ActiveRecord::Migration[6.0]
  def change
    add_column :urls, :pinned, :boolean, default: false
  end
end
