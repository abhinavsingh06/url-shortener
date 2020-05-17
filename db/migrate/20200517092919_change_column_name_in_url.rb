class ChangeColumnNameInUrl < ActiveRecord::Migration[6.0]
  def change
    rename_column :urls, :original_url, :original
    rename_column :urls, :short_url, :short
  end
end
