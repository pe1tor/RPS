Rails.application.routes.draw do
  root to: 'playgrounds#show'
  resource :playgrounds, only: %i(show create)
end
