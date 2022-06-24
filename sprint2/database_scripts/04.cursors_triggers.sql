------------------------- Oficial Ta' Bueno SQL Query -------------------------

--------------- Checking unique Email for new users --------------
create trigger UniqueEmail
on Users
instead of insert
as
declare @identification char(10), @first_name varchar(50), @last_name varchar(50), @last_name2 varchar(50), @email varchar(255), @password varchar(255), @country varchar(50), @state varchar(50), @city varchar(50), @zip_code varchar(255), @address varchar(255), @user_type tinyint, @phone varchar(17)
declare cursor_insertado cursor for
	select Identification, FirstName, LastName, LastName2, Email, Password, Country, State, City, ZipCode, Address, UserType, Phone
	from inserted
open cursor_insertado
fetch next from cursor_insertado into @identification, @first_name, @last_name, @last_name2, @email, @password, @country, @state, @city, @zip_code, @address, @user_type, @phone
while @@FETCH_STATUS = 0 begin
	if @email in (select Email from Users) begin
		print 'Denied: The email is already in use'
	end
	else begin
		insert into Users
		values (@identification, @first_name, @last_name, @last_name2, @email, @password, @country, @state, @city, @zip_code, @address, @user_type, @phone)
	end
	fetch next from cursor_insertado into @identification, @first_name, @last_name, @last_name2, @email, @password, @country, @state, @city, @zip_code, @address, @user_type, @phone
end
close cursor_insertado
deallocate cursor_insertado