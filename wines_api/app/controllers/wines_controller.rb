class WinesController < ApplicationController

  def wine_params
    params.require(:wine).permit([:name, :colour, :country, :year, :image])
  end

  def index
    wines = Wine.all
    render :json => wines
  end

  def create
    wine = Wine.create( {
      name: params[:name],
      colour: params[:colour],
      country: params[:country],
      year: params[:year],
      image: params[:image]
      })
    render :json => wine

  end

  def search
    wines = Wine.all.where("name like %#{params[:name]}%")
    render :json => wines

  end

  def show
    wine = Wine.find( params[:id] )
    render :json => wine
  end

  def destroy
    wine = Wine.find( params[:id] )


    if wine.destroy!
      render :json => {status: :Wine_Deleted}
    else
      render :json => {status: :delete_failed}

    end
  end

  def update
    wine = Wine.find(params[:id])

    if wine.update_attributes(wine_params)
      render :json => wine
    else
      render :json => {status: :update_failed}
    end
  end
end