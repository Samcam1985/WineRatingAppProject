class ReviewsController < ApplicationController

  def review_params
    params.require(:review).permit([:content, :rating, :wine_id])
  end

  def index 
    reviews = Review.all
    render :json => reviews
  end

  def show
    reviews = Review.all.where("wine_id = #{params[:id]}")
    render :json => reviews
  end

  def create
    review = Review.create( {
      content: params[:content],
      rating: params[:rating],
      wine_id: params[:wine_id]
      })

    reviews = Review.all.where("wine_id = #{params[:wine_id]}")
    render :json => reviews, status: :created
end
end