class Person:
  general_info = "People ain't good!!!"
  def __init__(self, name, nickname="General Nickname"):
    self.name = name
    self.nickname = nickname


# print(Person.name)
# print(Person.nickname)
print(Person.general_info)

mark = Person("Mark")
print(mark.name)
print(mark.nickname)

