class Api::V1::UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @urls = Url.order(pinned: :desc, updated_at: :desc)
    @categories = Category.all.map{|c| {name:c.name,color: c.color,id: c.id}}
    render status: :ok, json: { urls: @urls, categories: @categories }
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
    @url.update_attributes(count: @url.count + 1)
    @visit = Visit.create(urls_id: @url.id)
    if @url
      if @url.category
        render status: :ok, json: { original: @url.original, category: @url.category }
      else
        render status: :ok, json: { original: @url.original, count: @url.count, visits: @visit }
      end
    else
      render status: :not_found
    end
  end

  def update
    @url = Url.find(params[:id])
    if @url.update(url_params)
      @urls = Url.order(pinned: :desc, updated_at: :desc)
      @categories = Category.all.map{|c| {name:c.name,color: c.color,id: c.id}}
      render status: :ok, json: { urls: @urls, categories: @categories }
    else
      render status: :not_found
    end
  end

  private

  def url_params
    params.require(:url).permit(:original, :category_id, :pinned)
  end

end
