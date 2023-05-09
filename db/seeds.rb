# frozen_string_literal: true

# 初期データを作成
json = ActiveSupport::JSON.decode(File.read('db/seeds/events.json'))
json.each do |record|
  Event.create!(record)
end
