/* alter table public.accounts add column email character varying(255) not null default ''; */
create or replace function public.handle_new_user() 
returns trigger as $$
  plv8.execute('insert into public.accounts (id, email) values ($1, $2)', new.id, new.email)
  var username = new.email.split('@')[0]
  plv8.execute('insert into public.profiles (user_id, username) values ($1, $2)', new.id, username)
  
  return new;
$$ language plv8 security definer;

/* create or replace function public.handle_user_change() 
returns trigger as $$
begin
    if old.email != new.email then
    insert into public.accounts (email)
    values (new.email);
  end if;

  return new;
end;
$$ language plpgsql security definer;

 create trigger on_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_change(); */