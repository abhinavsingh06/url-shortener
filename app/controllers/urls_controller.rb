class UrlsController < ApplicationController
  before_action :find_url, only: [:show]

  def index
  end

  def create
    @url = Url.find_by_original(params[:original])
    if @url
      return render status: :ok, json: { slug: @url.short  }
    else
      @url = Url.new
      @url.original = params[:original]
      @url.sanitize
        if @url.save
          return render status: :ok, json: { slug: @url.short }
        else
          return render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
        end
    end
  end

  def show
    @url = Url.find_by_short(params[:short])
    if @url
      return render status: :ok, json: { original: @url.original }
    else
      return render status: :not_found
    end
    @original = @url.sanitize
    @short = @url.short
  end

  private

  def find_url
    @url = Url.find_by_short(params[:short])
  end

  def url_params
    params.require(:url).permit(:original)
  end
end
