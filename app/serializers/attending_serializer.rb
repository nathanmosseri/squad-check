class AttendingSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :attending, :name
end
