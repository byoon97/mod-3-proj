class UserSerializer
  include FastJsonapi::ObjectSerializer
  has_many :items
  attributes :name, :rating
end
