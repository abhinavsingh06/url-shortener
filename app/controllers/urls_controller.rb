class UrlsController < ApplicationController
  before_action :find_url, only: [:shortened]

  def create
    @url = Url.find_by_original_url(params[:original_url])
    if @url
      render status: :ok, json: { success: true, slug: @url.short_url  }
    else
      @url = Url.new
      @url.original_url = params[:original_url]
      @url.sanitize
        if @url.save 
          render status: :ok, json: { success: true, slug: @url.short_url }
        else
          render status: :unprocessable_entity, json: { success: false, errors: @url.errors.full_messages }
        end
    end
  end

  def shortened
    @url = Url.find_by_short_url(params[:short_url])
    if @url
      return render status: :ok, json: { success: true, original_url: @url.original_url }
    else
      return render status: :not_found, json: { success: false }
    end
    @original_url = @url.sanitize_url
    @short_url = @url.short_url
  end

  private

  def find_url
    @url = Url.find_by_short_url(params[:short_url])
  end

  def url_params
    params.require(:url).permit(:original_url)
  end
end
