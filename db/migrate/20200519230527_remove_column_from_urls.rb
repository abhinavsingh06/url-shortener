class RemoveColumnFromUrls < ActiveRecord::Migration[6.0]
  def change
    remove_column :urls, :sanitize_url, :string
  end
end
