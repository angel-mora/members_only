class Post < ApplicationRecord
  validates :comment, :title, presence: true
  belongs_to :user
end
