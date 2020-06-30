require 'test_helper'

class PlaygroundsControllerTest < ActionController::TestCase
  tests PlaygroundsController

  test 'create win' do
    post :create, default_params('paper')
    assert response_json['result']
    assert 'rock', response_json['opponent_choice']
  end

  test 'create loss' do
    post :create, default_params('scissors')
    assert_not response_json['result']
  end

  test 'create tie' do
    post :create, default_params
    assert_equal 'tie', response_json['result']
  end

  test 'create failed' do
    post :create
    assert_equal 422, response.status
  end

  private

  def default_params(choice = 'rock')
    {
      format: :json,
      params: {
        player_choice: choice
      }
    }
  end
end
