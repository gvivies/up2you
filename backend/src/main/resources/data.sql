insert into Player(id, name, player_type, picture) values (1, 'Cathy', 'PERSON', 'cathy.png');
insert into Player(id, name, player_type, picture) values (2, 'Bob', 'PERSON', 'bob.png');
insert into Player(id, name, player_type, picture) values (3, 'Georges', 'PERSON', 'georges.png');
insert into Player(id, name, player_type, picture) values (4, 'Anna', 'PERSON', 'anna.png');
insert into Player(id, name, player_type, picture) values (5, 'Steve', 'PERSON', 'steve.png');
insert into Player(id, name, player_type, picture) values (6, 'Charlize', 'PERSON', 'charlize.png');
insert into Player(id, name, player_type, picture) values (7, 'Team Yellow', 'TEAM', 'yellow.png');
insert into Player(id, name, player_type, picture) values (8, 'Team Blue', 'TEAM', 'blue.png');
insert into Player(id, name, player_type, picture) values (9, 'Team Red', 'TEAM', 'red.png');
insert into Player(id, name, player_type, picture) values (10, 'Team Green', 'TEAM', 'green.png');
insert into Player(id, name, player_type, picture) values (11, 'Team Purple', 'TEAM', 'purple.png');
insert into Player(id, name, player_type, picture) values (12, 'Team White - Test for delete', 'TEAM', 'white.png');

insert into Task(id, name) values (1, 'Retrospective animation');
insert into Task(id, name) values (2, 'Sprint planning reporting');
insert into Task(id, name) values (3, 'Happiness management');
insert into Task(id, name) values (4, 'Stand up meeting animation');
insert into Task(id, name) values (5, 'Sprint release');
insert into Task(id, name) values (6, 'Delivery packaging');

insert into Track(id, task_id, current_position, description, type) values (1,1,3, 'Track #1', 'PERSON');
insert into Track(id, task_id, current_position, description, type) values (2,5,5, 'Track #2', 'TEAM');

insert into Place(id, position, player_id, track_id) values (1, 1, 1, 1);
insert into Place(id, position, player_id, track_id) values (2, 2, 2, 1);
insert into Place(id, position, player_id, track_id) values (3, 3, 3, 1);
insert into Place(id, position, player_id, track_id) values (4, 4, 4, 1);
insert into Place(id, position, player_id, track_id) values (5, 5, 5, 1);
insert into Place(id, position, player_id, track_id) values (6, 6, 6, 1);

insert into Place(id, position, player_id, track_id) values (7, 1, 7, 2);
insert into Place(id, position, player_id, track_id) values (8, 2, 8, 2);
insert into Place(id, position, player_id, track_id) values (9, 3, 9, 2);
insert into Place(id, position, player_id, track_id) values (10, 4, 10,2);
insert into Place(id, position, player_id, track_id) values (11, 5, 11,2);

