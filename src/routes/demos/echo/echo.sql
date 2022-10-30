create or replace function echo(
    phrase text,
    delay integer = 3
  ) returns text as
$$
  select (result.phrase) from (
    select
        pg_sleep(delay) as delay,
        phrase as phrase
  ) as result;
$$ language sql;