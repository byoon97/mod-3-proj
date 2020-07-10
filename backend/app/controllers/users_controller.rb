class UsersController < ApplicationController
    def index
        users = User.all 
        # options = {
        #   include: [:items]
        # }
        render json: UserSerializer.new(users)
    end
end
