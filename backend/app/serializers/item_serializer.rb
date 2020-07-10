class ItemSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :user
  attributes :name, :description, :quantity, :price, :img_url, :user_id
end
