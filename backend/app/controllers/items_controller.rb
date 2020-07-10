class ItemsController < ApplicationController
    def index
        items = Item.all 
        render json: ItemSerializer.new(items)
    end

    def create
        item = Item.create(item_params)

        render json: ItemSerializer.new(item)
    end

    def destroy
        item = Item.destroy(params[:id])

        render json: ItemSerializer.new(item)
    end

    private
    
    def item_params
        params.require(:item).permit(:name,:user_id, :img_url, :description, :price, :quantity)
    end
end
