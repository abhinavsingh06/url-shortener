class Api::V1::UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @urls= Url.order(pinned: :desc, updated_at: :desc)
    render status: :ok, json: { urls: @urls }
  end

  def create
    @url = Url.find_by_original(params[:original])
    if @url
      return render status: :ok, json: { slug: @url.short  }
    else
      @url = Url.new
      @url.original = params[:original]
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
      render status: :ok, json: { original: @url.original }
    else
      render status: :not_found
    end
  end

  def update
    @url = Url.find_by_short(params[:short])
    if @url.update(url_params)
      render status: :ok, json: { urls: Url.order(pinned: :desc, updated_at: :desc) }
    else
      render status: :not_found
    end
  end

  private

  def url_params
    params.require(:url).permit(:original, :pinned)
  end
end
