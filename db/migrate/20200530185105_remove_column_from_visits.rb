class RemoveColumnFromVisits < ActiveRecord::Migration[6.0]
  def change
    remove_column :visits, :visited_on, :date
  end
end
