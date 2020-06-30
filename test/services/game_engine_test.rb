require 'test_helper'

class GameEngineTest < ActionController::TestCase
  setup do
    @engine = GameEngine.new(:rock)
  end

  test 'success response' do
    assert_equal 'tie', @engine.result
    assert_equal :rock, @engine.opponent_choice
  end

  test 'failed response' do
    RpsApi.any_instance.stubs(:success?).returns(false)
    GameEngine.any_instance.stubs(:random_throw).returns('something')
    assert_nil @engine.result
    assert_equal 'something', @engine.opponent_choice
  end

  test 'player lost' do
    RpsApi.any_instance.stubs(:curbs_choice).returns(:paper)
    assert_not @engine.result
    assert_equal :paper, @engine.opponent_choice
  end

  test 'player wins' do
    RpsApi.any_instance.stubs(:curbs_choice).returns(:scissors)
    assert @engine.result
    assert_equal :scissors, @engine.opponent_choice
  end
end
