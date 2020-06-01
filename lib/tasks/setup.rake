desc "Ensure that code is not running in production environment"
task :not_production do
  if Rails.env.production? && ENV["DELETE_PRODUCTION_DATA"].blank?
    puts ""
    puts "*" * 50
    puts "Deleting production data is not allowed. "
    puts "If you really want to delete all production data and populate sample data then "
    puts "you can execute following command."
    puts "DELETE_PRODUCTION_DATA=1 rake setup_sample_data"
    puts " "
    puts "If you are using Heroku then execute command as shown below"
    puts "heroku run rake setup_sample_data DELETE_PRODUCTION_DATA=1 -a app_name"
    puts "*" * 50
    puts ""
    throw :error
  end
end

desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, :not_production, "db:drop", "db:create", "db:migrate"] do
  ["setup_sample_data"].each { |cmd| system "rake #{cmd}" }
end

def delete_all_records_from_all_tables
  ActiveRecord::Base.connection.schema_cache.clear!

  Dir.glob(Rails.root + "app/models/*.rb").each { |file| require file }

  ApplicationRecord.descendants.reverse.each do |klass|
    klass.reset_column_information
    klass.destroy_all
  end
end

desc "Deletes all records and populates sample data"
task setup_sample_data: [:environment, :not_production] do
  delete_all_records_from_all_tables

  urls = [
    "https://bigbinary.com/jobs",
    "https://google.com",
    "https://github.com/abhinavsingh06",
    "http://www.youtube.com",
    "http://www.facebook.com",
    "http://www.baidu.com",
    "http://www.yahoo.com",
    "http://www.amazon.com",
    "http://www.wikipedia.org"
  ]

  visits = [
    "1", "2", "3", "4", "6", "8" ,"9"
  ]

  urls.each do |url|
    create_url(url)
  end

  visits.each do |visit|
    rand(0..5).times { create_visits(visit) }
  end

  puts "sample data was added successfully"
end

def create_url(original)
  Url.create!(original: original)
end

def create_visits(urls_id)
  visit = Visit.create!(urls_id: urls_id)
  @url = Url.find(urls_id)
  @url.update(count: @url.count+1)
  visit.update( created_at: rand(1..100).days.ago)
end
