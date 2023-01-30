class ApplicationController < ActionController::Base
    # CSRF保護対策
    # CSRFトークンが提供されない場合、Railsが空セッションで応答。
    protect_from_forgery with: :null_session
end
