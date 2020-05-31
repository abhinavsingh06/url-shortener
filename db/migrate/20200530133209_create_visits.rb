class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.date :visited_on, null: false

      t.timestamps
    end
    add_reference :visits, :urls
  end
end
