
#UI
���������� � ������� AngularJS
"http://localhost:4200/login"

# RestAPI

���������� � ������� Spring Boot.
https://github.com/AnneKsatn/EmergnRestAPI
������� ������� �� "http://localhost:4200"
���������� ��������� ������� � �� ����� �� "http://localhost:8080/users"

#�� 

PostgreSQL. ����������:

1. ���������� PostgreSQL
2. ������� �� "emergn" 
3. ������� ������� "users"

CREATE TABLE users
(
    Id SERIAL PRIMARY KEY,
    Email CHARACTER VARYING(30),
    Login CHARACTER VARYING(30),
    Password CHARACTER VARYING(30),
	Name CHARACTER VARYING(30)
);
