class UrlsController < ApplicationController
  before_action :find_url, only: [:shortened]

  def create
    @url = Url.new
    @url.original_url = params[:original_url]
    @url.sanitize
    if @url.new_url?
      if @url.save
        new_url = 'https://short.is' + '/' + @url.short_url
        render status: :ok, json: { success: true, slug: @url.short_url }
      else 
        render status: :unprocessable_entity, json: { success: false, errors: @url.errors.full_messages }
      end
    else 
      render status: :not_found, json: { message: "A short link for this URL is already present in the database" }
    end
  end
end
