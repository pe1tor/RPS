# frozen_string_literal: true

class GameEngine
  attr_reader :player_choice, :api

  RESULT_MAP = {
    rock: {
      rock: 'tie',
      paper: false,
      scissors: true,
    },
    paper: {
      rock: true,
      paper: 'tie',
      scissors: false,
    },
    scissors: {
      rock: false,
      paper: true,
      scissors: 'tie'
    }
  }

  def initialize(player_choice)
    @player_choice = player_choice
    @api = RpsApi.new
  end

  def result
    RESULT_MAP[player_choice][opponent_choice]
  end

  def opponent_choice
    @opponent_choice ||= api.success? ? api.curbs_choice : random_throw
  end

  private

  def random_throw
    RESULT_MAP.keys.sample
  end
end
