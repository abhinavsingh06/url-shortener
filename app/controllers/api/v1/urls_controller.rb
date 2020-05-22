class Api::V1::UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :load_category, only: [:create]

  def index
    @urls = Url.order(pinned: :desc, updated_at: :desc)
    category = {}
    @urls.each do |url|
      if url.category
        category[url.id] = url.category.as_json
      end  
    end
    render status: :ok, json: { urls: @urls, category: category }
  end

  # def new
  #   @url = Url.new
  #   @categories = Category.all.map{|c| [c.name, c.color, c.id]}
  # end

  def create
    @url = Url.find_by_original(params[:original])
    if @url
      return render status: :ok, json: { slug: @url.short  }
    else
      @url = Url.new
      @url.original = params[:original]
      # @url.category_id = params[:category_id] 
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
      if @url.category
        render status: :ok, json: { original: @url.original, category: @url.category }
      else
        render status: :ok, json: { original: @url.original }
      end
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
    params.require(:url).permit(:original, :category_id, :pinned)
  end

  # def load_category
  #   begin
  #     @category = Category.find_by_category_id(params[:category_id])
  #   rescue ActiveRecord::RecordNotFound
  #   end
  # end
end
